import React from 'react';
// dom
import {hydrate, render} from 'react-dom'   // react16以后用hydrate来代替render，用于支持ssr
import {renderToString} from 'react-dom/server'
// router
import {StaticRouter, BrowserRouter} from 'react-router-dom'
// store
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import * as reducers from '../store/reducers'
import App from './App'

export function inital (type, url = '') {
    if (type === 'server') {
        const serverStore = createStore(reducers.counter)
        return {
            dom: renderToString(
                <Provider store={serverStore}>
                    {/* 之前提示的：存在这段代码会导致控制台报错：react-dom.development.js:506 Warning: Expected server HTML to contain a matching <div> in <div>. 是因为location传入的值跟实际nodejs接收的请求url不一致导致的 */}
                    <StaticRouter location={url} context={{}}>
                        <App />
                    </StaticRouter>
                </Provider>
            ),
            store: serverStore
        }
    } else if (type === 'client') {
        const clientStore = createStore(reducers.counter, window.__PRELOADED_STATE__)
        delete window.__PRELOADED_STATE__

        return {
            dom: hydrate(
                <Provider store={clientStore}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </Provider>
                , document.getElementById('root')
            ),
            store: clientStore
        }
    }
}
