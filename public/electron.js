const axios = require('axios');

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

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

function runWinApi() {
    var child = require('child_process').execFile;
    var dirPath = app.getAppPath();
    var apiPath = path.join(dirPath, 'api-bin/DrDocx-API.exe');

    child(apiPath, function (err, data) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(data.toString());
    });
}

app.on('ready', () => {
    if (process.platform === 'win32') {
        runWinApi();
        axios.get('https://localhost:1211/api/ping').then((response) => {
            if (response.status === 200) {
                createWindow();
            }
        }).catch((error) => {
            console.log(error);
            createWindow();
        });
    } else {
        createWindow();
    }
});

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
    // TODO: Kill api process
});
