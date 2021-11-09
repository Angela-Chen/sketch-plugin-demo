import sketch from 'sketch';
import BrowserWindow from 'sketch-module-web-view';
import { getWebview } from 'sketch-module-web-view/remote';
import UI from 'sketch/ui';

const webviewIdentifier = 'sketch-plugin-demo.webview'

export default () => {
  const options = {
    identifier: webviewIdentifier,
    title: '登录',
    // x: 0,
    // y: 0,
    width: 340,
    height: 500,
    resizable: true
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

  // release
  // browserWindow.loadURL(require('./dist/index.html'))

  // dev
  const Panel = `http://localhost:8000#${Math.random()}`;
  browserWindow.loadURL(Panel)
}

// When the plugin is shutdown by Sketch (for example when the user disable the plugin)
// we need to close the webview if it's open
export function onShutdown() {
  const existingWebview = getWebview(webviewIdentifier)
  if (existingWebview) {
    existingWebview.close()
  }
}

export function onOpenDocument() {

};