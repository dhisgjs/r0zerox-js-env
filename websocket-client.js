const WebSocket = require('ws');
const https = require('https');
const url = require('url');
const VMContext = require('./core/vm-context');
const initR0zerox = require('./utils/r0zerox.js');
const BrowserEnv = require('./env/index.js');
const axios = require('axios');
const vmCtx = new VMContext({ timeout: 10000 });
const fs = require('fs');
const crypto = require('crypto');



initR0zerox(vmCtx);
new BrowserEnv(vmCtx, {
    url: 'https://live.douyin.com/208823316033?anchor_id=85577870861&category_name=all&is_vs=0&page_type=main_category_page&vs_ep_group_id=&vs_episode_id=&vs_episode_stage=&vs_season_id=',
});

function md5 (str) {
    return crypto.createHash('md5').update(str).digest('hex');
}

async function getSignature (info) {
    const originCode = fs.readFileSync('./code.js', 'utf8');
    vmCtx.run(originCode);
    await new Promise(resolve => setTimeout(resolve, 500));
    let byted_acrawler = vmCtx.get('window.byted_acrawler');
    vmCtx.run(`window.__signature__ = window.byted_acrawler.frontierSign({
            "X-MS-STUB": "${md5(info)}"
        });`);
    await new Promise(resolve => setTimeout(resolve, 100));
    let __signature__ = vmCtx.get('__signature__');
    console.log('__signature__->', __signature__);
    return __signature__;
}

async function initWebSocket (roomUrl = 'https://live.douyin.com/684938926972') {
    const roomInfo = await fetchRoomInfo(roomUrl);
    console.log('房间信息:', roomInfo);
    const signature = await getSignature(`'live_id=1,aid=6383,version_code=180800,webcast_sdk_version=1.0.15,room_id=${roomInfo.roomId},sub_room_id=,sub_channel_id=,did_rule=3,user_unique_id=7585630718483940902,device_platform=web,device_type=,ac=,identity=audience'`);
    console.log('签名:', signature['X-Bogus']);
    roomInfo['signature'] = signature['X-Bogus'];
    const wsUrl = buildWebSocketUrl(roomInfo);
    console.log('WebSocket URL:', wsUrl);

    const ws = new WebSocket(wsUrl, {
        headers: buildWebSocketHeaders(roomInfo.cookies),
        perMessageDeflate: true
    });

    setupWebSocketHandlers(ws);

    return ws;
}

async function fetchRoomInfo (roomUrl) {
    const roomIdFromUrl = extractRoomIdFromUrl(roomUrl);

    try {
        const response = await axios.get(roomUrl, {
            headers: {
                'Referer': 'https://live.douyin.com/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0',
                'sec-ch-ua': '"Chromium";v="148", "Microsoft Edge";v="148", "Not/A)Brand";v="99"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
            },
            maxRedirects: 5
        });

        const cookies = {};
        const setCookieHeaders = response.headers['set-cookie'];
        if (setCookieHeaders) {
            const parts = Array.isArray(setCookieHeaders) ? setCookieHeaders : [setCookieHeaders];
            const cookieAttributes = ['domain', 'path', 'expires', 'httponly', 'samesite', 'secure'];

            for (const part of parts) {
                const pairs = part.split(';');
                for (const pair of pairs) {
                    const [key, ...valueParts] = pair.split('=');
                    if (key && key.trim()) {
                        const keyTrimmed = key.trim().toLowerCase();
                        if (!cookieAttributes.includes(keyTrimmed)) {
                            cookies[key.trim()] = valueParts.join('=').trim();
                        }
                    }
                }
            }
        }

        const roomData = extractRoomData(response.data);

        return {
            roomId: roomData.roomId || roomIdFromUrl,
            ttwid: cookies['ttwid'] || null,
            ttwidDecoded: decodeURIComponent(cookies['ttwid'] || ''),
            webrid: roomData.webrid,
            statusCode: response.status,
            cookies: cookies
        };
    } catch (error) {
        console.error('获取房间信息失败:', error.message);
        throw error;
    }
}

function extractRoomIdFromUrl (roomUrl) {
    const match = roomUrl.match(/\/live\/(\d+)/);
    return match ? match[1] : null;
}

function parseCookies (cookieHeader) {
    if (!cookieHeader) return {};
    const cookies = {};
    const parts = Array.isArray(cookieHeader) ? cookieHeader : [cookieHeader];

    const cookieAttributes = ['domain', 'path', 'expires', 'httponly', 'samesite', 'secure'];

    for (const part of parts) {
        const pairs = part.split(';');
        for (const pair of pairs) {
            const [key, ...valueParts] = pair.split('=');
            if (key && key.trim()) {
                const keyTrimmed = key.trim().toLowerCase();
                // 跳过 cookie 属性，只提取真正的 cookie 名称和值
                if (!cookieAttributes.includes(keyTrimmed)) {
                    cookies[key.trim()] = valueParts.join('=').trim();
                }
            }
        }
    }
    return cookies;
}

function extractRoomData (html) {
    const result = { roomId: null, webrid: null };
    const scriptPattern = /<script[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/script>/gi;
    let match;

    while ((match = scriptPattern.exec(html)) !== null) {
        const content = match[2];
        if (content.includes('%7B')) {
            try {
                const decoded = decodeURIComponent(content);
                const webridMatch = decoded.match(/"webrid"\s*:\s*"(\d+)"/);
                if (webridMatch) result.webrid = webridMatch[1];

                const idPatterns = [/"id_str"\s*:\s*"(\d+)"/, /"roomId"\s*:\s*"(\d+)"/, /"room_id"\s*:\s*"(\d+)"/];
                for (const pattern of idPatterns) {
                    const idMatch = decoded.match(pattern);
                    if (idMatch) { result.roomId = idMatch[1]; break; }
                }
            } catch (e) { }
        }
    }

    if (!result.roomId) {
        const numbers = html.match(/\b\d{15,20}\b/g);
        if (numbers) result.roomId = [...new Set(numbers)][0];
    }

    return result;
}

function buildWebSocketUrl (roomInfo) {
    const baseUrl = 'wss://webcast100-ws-web-lq.douyin.com/webcast/im/push/v2/';
    const timestamp = Date.now();

    const queryParams = new URLSearchParams({
        app_name: 'douyin_web',
        version_code: '180800',
        webcast_sdk_version: '1.0.15',
        update_version_code: '1.0.15',
        compress: 'gzip',
        device_platform: 'web',
        cookie_enabled: 'true',
        screen_width: '1536',
        screen_height: '864',
        browser_language: 'zh-CN',
        browser_platform: 'Win32',
        browser_name: 'Mozilla',
        browser_version: '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0',
        browser_online: 'true',
        tz_name: 'Asia/Shanghai',
        cursor: `u-1_h-1_t-${timestamp}_r-${Math.floor(Math.random() * 9999999999999999999)}_d-1`,
        internal_ext: `internal_src:dim|wss_push_room_id:${roomInfo.roomId}|wss_push_did:7585630718483940902|first_req_ms:${timestamp}|fetch_time:${timestamp}|seq:1|wss_info:0-${timestamp}-0-0|wrds_v:${Math.floor(Math.random() * 9999999999999999999)}`,
        host: 'https://live.douyin.com',
        aid: '6383',
        live_id: '1',
        did_rule: '3',
        endpoint: 'live_pc',
        support_wrds: '1',
        user_unique_id: '7585630718483940902',
        im_path: '/webcast/im/fetch/',
        identity: 'audience',
        need_persist_msg_count: '0',
        insert_task_id: '',
        live_reason: '',
        room_id: roomInfo.roomId,
        heartbeatDuration: '0',
        signature: roomInfo.signature
    });

    return `${baseUrl}?${queryParams.toString()}`;
}

function buildWebSocketHeaders (cookies) {
    const cookieString = Object.entries(cookies)
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');

    return {
        'Upgrade': 'websocket',
        'Origin': 'https://live.douyin.com',
        'Cache-Control': 'no-cache',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        'Pragma': 'no-cache',
        'Connection': 'Upgrade',
        'Sec-WebSocket-Key': 'rE7whJkLIXCboCwxC8hJpg==',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0',
        'Sec-WebSocket-Version': '13',
        'Sec-WebSocket-Extensions': 'permessage-deflate; client_max_window_bits',
        'Cookie': cookieString
    };
}

function setupWebSocketHandlers (ws) {
    ws.on('open', () => {
        console.log('✅ WebSocket 连接已建立');
    });

    ws.on('message', (data) => {
        try {
            const jsonData = JSON.parse(data.toString());
            console.log('收到消息:', JSON.stringify(jsonData, null, 2));
        } catch (e) {
            console.log('收到原始消息:', data.toString('utf8').slice(0, 200));
        }
    });

    ws.on('close', (code, reason) => {
        console.log('WebSocket 连接关闭:', code, reason.toString());
    });

    ws.on('error', (err) => {
        console.error('WebSocket 错误:', err);
    });
}

async function main () {
    try {
        console.log('=== 初始化 WebSocket 连接 ===\n');
        await initWebSocket();
    } catch (error) {
        console.error('错误:', error);
    }
}

if (require.main === module) {
    main();
}

module.exports = { initWebSocket };
