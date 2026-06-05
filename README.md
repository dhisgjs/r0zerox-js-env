# r0zerox-js-env

> 抖音直播弹幕捕获 + 通用 JS 补环境框架  
> 在 Node.js VM 沙箱中完整模拟浏览器环境，驱动 `byted_acrawler` SDK 生成 `X-Bogus` 签名，实时连接抖音弹幕 WebSocket 流。

---

## 功能

- **VM 沙箱隔离**：用 Node.js `vm` 模块创建隔离上下文，加密 JS 跑在沙箱里，不污染宿主环境
- **完整浏览器环境模拟**：BOM（window/navigator/screen/location/history/crypto）+ DOM（document/Element/HTMLCanvasElement）+ 网络（XHR）
- **Proxy 探针**：劫持所有属性访问，实时打印 get/set/delete 日志，快速定位缺哪个环境
- **`X-Bogus` 签名生成**：驱动抖音 `byted_acrawler.frontierSign()` 生成合法签名
- **弹幕 WebSocket 客户端**：自动获取房间信息 → 生成签名 → 建立 WebSocket 连接 → 解析弹幕消息

---

## 项目结构

```
r0zerox/
├── run.js                        # 签名测试入口（验证 X-Bogus 是否生成成功）
├── signature-generator.js        # 签名生成器（命令行工具）
├── websocket-client.js           # 弹幕 WebSocket 客户端（完整实现）
├── code.js                       # 抖音 byted_acrawler SDK（混淆产物，不含于仓库）
│
├── core/
│   └── vm-context.js             # VM 沙箱核心（隔离上下文、定时器管理、eval/Function 包装）
│
├── env/
│   ├── index.js                  # BrowserEnv 入口，统一初始化所有模块
│   ├── browser-env/
│   │   ├── BOM/
│   │   │   ├── window.js         # window + Image 构造函数
│   │   │   ├── navigator.js      # navigator（含 plugins/webdriver 等指纹属性）
│   │   │   ├── location.js       # location
│   │   │   ├── history.js        # history
│   │   │   ├── screen.js         # screen
│   │   │   ├── crypto.js         # crypto（getRandomValues 等）
│   │   │   ├── Storage.js        # localStorage / sessionStorage
│   │   │   ├── WindowProperties.js
│   │   │   └── device-events.js  # 设备事件
│   │   ├── DOM/
│   │   │   ├── document.js       # document（含 canvas 标签特殊处理）
│   │   │   ├── Element.js
│   │   │   ├── HTMLElement.js
│   │   │   ├── HTMLDocument.js
│   │   │   └── HTMLCanvasElement.js  # Canvas + CanvasRenderingContext2D 完整实现
│   │   └── common/
│   │       ├── EventTarget.js
│   │       └── Node.js
│   └── net/
│       └── xhr.js                # XMLHttpRequest
│
└── utils/
    ├── r0zerox.js                # Proxy 探针（get/set/delete 日志）+ createProto 工具
    ├── proxy.js                  # 独立 Proxy 包装器
    └── setNative.js              # Function.prototype.toString 伪装（native code 欺骗）
```

---

## 快速开始

### 环境要求

- Node.js 18+
- 依赖：`ws`、`axios`（仅 `websocket-client.js` 需要）

```bash
npm install ws axios
```

### 测试签名生成

将抖音 `byted_acrawler` SDK 保存为 `code.js`，放到 `r0zerox/` 目录下，然后：

```bash
node run.js
# 输出：__signature__-> { 'X-Bogus': 'f/4N4cewR5zqR/N9' }
```

### 命令行生成签名

```bash
node signature-generator.js <X-MS-STUB>
# 输出签名 JSON：{"X-Bogus": "..."}
```

### 启动弹幕抓取

```bash
node websocket-client.js
```

默认连接 `live.douyin.com/684938926972`，修改 `main()` 中的 `initWebSocket(roomUrl)` 传入目标直播间 URL。

---

## 核心架构

```
websocket-client.js
  ├── 1. fetchRoomInfo()       → 获取 roomId / ttwid / webrid
  ├── 2. getSignature()        → 生成 X-Bogus 签名
  │     └── VMContext
  │           └── BrowserEnv  → 初始化 BOM + DOM
  │                 └── vmCtx.run(code.js)  → 加载 byted_acrawler SDK
  │                       └── frontierSign()  → 输出 X-Bogus
  └── 3. initWebSocket()       → 建立 wss:// 连接，监听弹幕消息
```

---

## VMContext 设计

`core/vm-context.js` 是整个框架的基础，核心特性：

**白名单隔离**：只注入标准全局对象（Array/Object/JSON/Promise 等），隔离 Node.js 特征（Buffer/process/global）。

**`run()` 方法**：自动判断代码是语句还是表达式，统一绑定 `window` 为 `this`：
```js
vmCtx.run(codeJs);                            // 执行大段 JS 文件
vmCtx.run(`window.byted_acrawler.frontierSign({...})`);  // 执行表达式
```

**定时器托管**：所有 `setTimeout` / `setInterval` ID 统一存储，`vmCtx.destroy()` 时一次性清除。

**包装 eval/Function**：确保动态执行的代码仍在 VM 隔离上下文中运行，不逃逸到外部作用域。

---

## 调试技巧

开启 Proxy 探针后，控制台会打印每一次属性访问：

```js
// utils/r0zerox.js 中
r0zerox.config.proxy = true;  // 开启探针
```

输出示例：
```
get window navigator { userAgent: 'Mozilla/5.0 ...' }
get navigator userAgent 'Mozilla/5.0 ...'
get navigator webdriver false
```

通过日志可以快速定位加密脚本依赖了哪些浏览器属性，缺什么补什么。

---

## 踩坑记录

| 问题 | 原因 | 解法 |
|------|------|------|
| `code.js` 静默执行失败 | `run()` 正则匹配到开头注释 `/**` → 当成表达式 → 语法错误 | 去除注释后再判断代码类型 |
| `Image is not defined` | `byted_acrawler` 内部用了 `new Image()` 做指纹 | 在 `window.js` 补 `Image` 构造函数 |
| `PluginArray is not defined` | 混淆代码通过 `eval` 执行，只能访问全局作用域 | 注册到 `ctx.context.PluginArray` |
| `webdriver.toString()` 报错 | `navigator.webdriver` 未定义 | 添加 `webdriver: false` |
| `canvas.getContext is not a function` | `createElement('canvas')` 返回的是普通对象 | 实现完整 `HTMLCanvasElement` + `CanvasRenderingContext2D` |

详细调试过程见 [`环境修复总结.md`](./环境修复总结.md)。

---

## 作者

**r0zerox** | 公众号「逆向狂人」 | 微信：r0zerox

> 完整代码和调试工具在知识星球「Opcode Fight Clube」
