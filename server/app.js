const http = require('http')
const fs = require('fs')
const path = require('path')
const routes = require('./routes/index')

const tool4SSR = require('./tool4SSR')
const clientScripts = tool4SSR('Client')
let scriptsTag = ''
clientScripts.map((script) => {
	scriptsTag += `<script src=${script}></script>`
})

// 0. 模版引擎写死脚本(第三方cdn资源)
// 1. 根据请求特定url => 将传入的参数datasource注入到模版引擎的window
// 2 react服务端渲染
const server = http.createServer((req, res) => {
	// 解决跨域
	res.setHeader("Access-Control-Allow-Origin","*");
	res.setHeader("Access-Control-Allow-Headers","*");
	// 路由模块统一处理，按mvc架构划分
	if (/\.js/ig.test(req.url)) {
		// 处理静态资源
		const result = fs.readFileSync(path.resolve(__dirname, `../dist${req.url}`))
		res.end(result)
	} else if (req.url === '/favicon.ico') {
		return false
	} else if (/v1/ig.test(req.url)) {
		// 开启服务
		// 解决相应数据中文乱码
		res.setHeader("Content-Type","application/json;charset=utf-8");
		routes(req, res)
	} else {
		// ssr
		const ssrObj = require('./static/entry/serverEntry')	// react服务端代码用es6需要在这里处理
		const dom = ssrObj.inital('server', req.url).dom
		const store = ssrObj.inital('server', req.url).store
		// const title = ssrObj.inital('server').title
		res.setHeader("Content-Type","text/html;charset=utf-8");
		res.end(`
			<!DOCTYPE html>
			<html>
				<head>
					<title>React & React Router4 SSR</title>
				</head>
				<body>
					<p>服务端模板【服务端的脚本都插在root里面了】</p>
					<div id="root">${dom}</div>
					<script>window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())}</script>
					<!-- 与客户端js打通 -->
					${scriptsTag}
				</body>
			</html>
		`);
	}
});
server.listen(1234, () => {
	console.log('开始监听1234端口')
})
