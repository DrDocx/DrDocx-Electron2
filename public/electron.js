const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');
const child = require('child_process').execFile;

const { autoUpdater } = require("electron-updater")

let mainWindow;
var apiProcess;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000, height: 750, webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    if (isDev) {
        // Open the DevTools.
        //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', () => {
    runApi();
    createWindow();
    autoUpdater.checkForUpdatesAndNotify();
});

function runApi() {
    var dirPath = app.getAppPath();
    var apiPath;
    if (process.platform === 'win32') {
        apiPath = path.join(dirPath, '..', '..', 'api-bin', 'DrDocx-API.exe');
    }
    else if (process.platform === 'darwin') {
        apiPath = path.join(dirPath, '..', '..', 'api-bin', 'osx64', 'DrDocx-API');
    }

    if (apiPath == null) return;
    apiProcess = child(apiPath, function (err, data) {
        if (err) {
            console.error(err);
            return;
        }
    });
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

app.on('before-quit', () => {
    if (process.platform === 'darwin') {
        apiProcess.kill();
    }
});
