const fs = require('fs');
const VMContext = require('./core/vm-context');
const initR0zerox = require('./utils/r0zerox.js');
const BrowserEnv = require('./env/index.js');

// 获取命令行参数中的 X-MS-STUB 值
const args = process.argv.slice(2);
const xmsStub = args[0];

const vmCtx = new VMContext({ timeout: 10000 });

initR0zerox(vmCtx);
new BrowserEnv(vmCtx, {
    url: 'https://live.douyin.com/',
});

(async () => {
    try {
        const originCode = fs.readFileSync('./r0zerox/code.js', 'utf8');
        vmCtx.run(originCode);

        await new Promise(resolve => setTimeout(resolve, 500));

        vmCtx.run(`window.__signature__ = window.byted_acrawler.frontierSign({
            "X-MS-STUB": "${xmsStub}"
        });`);

        await new Promise(resolve => setTimeout(resolve, 100));

        let signature = vmCtx.get('window.__signature__');
        console.log(JSON.stringify(signature));
    } catch (e) {
        console.error(JSON.stringify({ error: e.message }));
    } finally {
        vmCtx.destroy();
    }
})();