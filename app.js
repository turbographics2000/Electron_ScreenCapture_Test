const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let win = null;

app.on('window-all-closed', _ => {
    if (process.platform != 'darwin')
        app.quit();
});

app.on('ready', _ => {
    electron.session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
        details.requestHeaders['Origin'] = 'electron://electron-skyway';
        callback({
            cancel: false,
            requestHeaders: details.requestHeaders
        });
    });

    win = new BrowserWindow({ width: 800, height: 600 });
    win.loadURL('file://' + __dirname + '/window.html');
    //win.webContents.openDevTools();
    win.on('closed', _ => {
        win = null;
    });
});
