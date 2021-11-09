/*
 * @Author: your name
 * @Date: 2021-11-08 23:54:03
 * @LastEditTime: 2021-11-09 00:18:25
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /sketch-plugin-demo/src/showWebview.js
 */
import sketch from 'sketch';
import BrowserWindow from 'sketch-module-web-view';
import { getWebview } from 'sketch-module-web-view/remote';
import UI from 'sketch/ui';

const webviewIdentifier = 'sketch-plugin-demo.webview'

export default function () {
  // console.log(sketch.getSelectedDocument());
  const options = {
    identifier: webviewIdentifier,
    title: 'Browser Window',
    // x: 0,
    // y: 0,
    width: 600,
    height: 400,
    resizable: true,
    handlers: {
      // plugin 和 webview 之间的通讯方法
    }
  }

  const browserWindow = new BrowserWindow(options)

  // only show the window when the page has loaded to avoid a white flash
  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  const webContents = browserWindow.webContents

  // print a message when the page loads
  webContents.on('did-finish-load', () => {
    UI.message('UI loaded!')
  })

  // add a handler for a call from web content's javascript
  webContents.on('nativeLog', s => {
    UI.message(s)
    webContents
      .executeJavaScript(`setRandomNumber(${Math.random()})`)
      .catch(console.error)
  })

  browserWindow.loadURL(require('../resources/webview.html'))
}

// When the plugin is shutdown by Sketch (for example when the user disable the plugin)
// we need to close the webview if it's open
export function onShutdown() {
  const existingWebview = getWebview(webviewIdentifier)
  if (existingWebview) {
    existingWebview.close()
  }
}
