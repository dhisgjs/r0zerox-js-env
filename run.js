const VMContext = require('./core/vm-context');
const initR0zerox = require('./utils/r0zerox.js');
const BrowserEnv = require('./env/index.js');
const vmCtx = new VMContext({ timeout: 10000 });
const fs = require('fs');


initR0zerox(vmCtx);
new BrowserEnv(vmCtx, {
	url: 'https://live.douyin.com/208823316033?anchor_id=85577870861&category_name=all&is_vs=0&page_type=main_category_page&vs_ep_group_id=&vs_episode_id=&vs_episode_stage=&vs_season_id=',
});

(async () => {
	try {
		const originCode = fs.readFileSync('./code.js', 'utf8');
		vmCtx.run(originCode);

		console.log('等待 byted_acrawler 初始化...');

		await new Promise(resolve => setTimeout(resolve, 500));

		let byted_acrawler = vmCtx.get('window.byted_acrawler');
		console.log('byted_acrawler:', byted_acrawler);

		vmCtx.run(`window.__signature__ = window.byted_acrawler.frontierSign({
		"X-MS-STUB": "d3d42a94212caf54bf13d4fdb0aa1b8c"
	});`);

		await new Promise(resolve => setTimeout(resolve, 100));

		let h5st = vmCtx.get('__signature__');
		console.log('__signature__->', h5st);
	} catch (e) {
		console.error('错误：', e.message);
		console.error(e.stack);
	} finally {
		vmCtx.destroy();
	}
})();
