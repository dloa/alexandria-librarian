import app from 'app';
import BrowserWindow from 'browser-window';
import path from 'path';
import yargs from 'yargs';

import trayTemplate from './app-tray';

const args = yargs(process.argv.slice(1)).wrap(100).argv;

app.on('ready', () => {
    var checkingQuit = false;
    var canQuit = false;
    const screenSize = require('screen').getPrimaryDisplay().workAreaSize;

    var mainWindow = new BrowserWindow({
        minWidth: 960,
        minHeight: 500,
        width: 960,
        height: screenSize.height * 0.7,
        icon: 'images/icons/librarian_icon.png',
        'standard-window': true,
        'auto-hide-menu-bar': true,
        resizable: true,
        title: 'ΛLΞXΛNDRIΛ Librarian',
        center: true,
        frame: true,
        show: false
    });

    if (args.dev) {
        mainWindow.show();
        mainWindow.toggleDevTools();
        mainWindow.focus();
        console.info('Dev Mode Active: Developer Tools Enabled.')
    }

    mainWindow.setMenu(null);

    mainWindow.loadURL(path.normalize('file://' + path.join(__dirname, '../index.html')));

    mainWindow.webContents.on('new-window', e => e.preventDefault());

    mainWindow.webContents.on('will-navigate', (e, url) => {
        if (url.indexOf('build/index.html#') < 0) {
            e.preventDefault();
        }
    });

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.setTitle('ΛLΞXΛNDRIΛ Librarian');
        mainWindow.show();
        mainWindow.focus();
    });

    const helper = {
        toggleVisibility: () => {
            if (mainWindow) {
                const isVisible = mainWindow.isVisible();
                if (isVisible) {
                    if (process.platform == 'darwin') {
                        app.dock.hide();
                    }
                    mainWindow.hide();
                } else {
                    if (process.platform == 'darwin') {
                        app.dock.show();
                    }
                    mainWindow.show();
                }
            }
        },
        quit: () => {
            canQuit = true;
            app.quit()
        }
    };

    mainWindow.on('close', (event) => {
        if (!canQuit) {
            helper.toggleVisibility();
            return event.preventDefault();
        } else
            app.quit();
    });

    trayTemplate.init(helper);
});


app.on('window-all-closed', app.quit);