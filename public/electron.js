const electron = require('electron');
const {app, Menu} = electron;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');
const child = require('child_process').execFile;

const { autoUpdater } = require("electron-updater");
autoUpdater.autoDownload = false;

let mainWindow;
let apiProcess;
let updater;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1100, height: 800, webPreferences: {
            nodeIntegration: true
        }
    });
    configureNativeMenu();
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    if (isDev) {
        // Open the DevTools.
        //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', () => {
    if (!isDev) {
        runApi();
        // autoUpdater.checkForUpdatesAndNotify();
    }
    createWindow();
});

function configureNativeMenu() {
    let defaultMenu = Menu.getApplicationMenu()

    let newMenu = new Menu();
    defaultMenu.items
        .filter(x => x.label !== 'Help')
        .forEach(x => newMenu.append(x));
    Menu.setApplicationMenu(newMenu);
}

function runApi() {
    const dirPath = app.getAppPath();
    let apiPath;
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

/*
autoUpdater.on('update-available', () => {
    electron.dialog.showMessageBox({
        type: 'info',
        title: 'Found Updates',
        message: 'Found updates, do you want update now?',
        buttons: ['Sure', 'No']
    }, (buttonIndex) => {
        if (buttonIndex === 0) {
            autoUpdater.downloadUpdate()
        }
        else {
            updater.enabled = true
            updater = null
        }
    })
});

autoUpdater.on('update-not-available', () => {
    updater.enabled = true
    updater = null
});

autoUpdater.on('update-downloaded', () => {
    electron.dialog.showMessageBox({
        title: 'Install Updates',
        message: 'Updates downloaded, application will be restarted to update.'
    }, () => {
        setImmediate(() => autoUpdater.quitAndInstall())
    })
});

function checkForUpdates (menuItem, focusedWindow, event) {
    updater = menuItem
    updater.enabled = false
    autoUpdater.checkForUpdates()
}
module.exports.checkForUpdates = checkForUpdates;
*/
