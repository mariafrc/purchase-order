import {app, BrowserWindow, Menu, Tray, ipcMain} from 'electron';
import {initDatabase} from './config/database';
import {createWindow} from './config/create-windows';
import {getConnection} from 'typeorm';
import * as path from 'path';
import * as url from 'url';

//ipc imports
import {inChargeController} from './controllers/in-charge.controller';
import {supplierController} from './controllers/supplier.controller';
import {articleController} from './controllers/article.controller';
import {orderFormController} from './controllers/order-form.controller';

// detect serve mode
const args = process.argv.slice(1);
let serve: boolean = args.some(val => val === '--serve');

let win: BrowserWindow = null;

try {
    /* -- initialize electron app -- */
    app.on('ready', () => {
        createWindow(win);

        ipcMain.on('request:connect-database', (event) => {
            initDatabase()
                .then(()=>{
                     //ipc calls;
                    inChargeController();
                    supplierController();
                    articleController();
                    orderFormController();
                    event.sender.send('connect-database', true);
                })
                .catch((err)=>{
                    throw err;
                    event.sender.send('connect-database', false);
                })
        })

        ipcMain.on('request:get-connection', (event)=>{
            try{
                const connection = getConnection();
                event.sender.send('get-connection', true);
            } catch {
                event.sender.send('get-connection', false);
            }
        })
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