import {app, BrowserWindow, Menu, Tray, ipcMain} from 'electron';
import {initDatabase} from './config/database';
import {createWindow} from './config/create-windows';
import * as path from 'path';
import * as url from 'url';

//ipc imports
import {testController} from './controllers/test.controller';

// detect serve mode
const args = process.argv.slice(1);
let serve: boolean = args.some(val => val === '--serve');

let win: BrowserWindow = null;

try {
    /* -- initialize electron app -- */
    app.on('ready', async () => {
        await initDatabase();
        createWindow(win)
        
        //ipc calls;
        testController();
    });

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on("activate", () => {
        if (win === null) {
            createWindow(win);
        }
    });

} catch (err) {
    throw err;
}