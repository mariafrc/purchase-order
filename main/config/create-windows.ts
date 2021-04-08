import {BrowserWindow} from 'electron';
import * as path from 'path';
import * as url from 'url';

// detect serve mode
const args = process.argv.slice(1);
let serve: boolean = args.some(val => val === '--serve');

export function createWindow(win): BrowserWindow | null {

    win = new BrowserWindow({
        width: 800, 
        height: 600, 
        webPreferences: {
            nodeIntegration: true
        },
    });

    if (serve) {
        win.loadURL('http://localhost:4200');
        //win.webContents.openDevTools();
    } else {

        win.loadURL(url.format({
            pathname: path.resolve(__dirname, "../../renderer/index.html"),
            protocol: "file:",
            slashes: true
        }));
    }

    win.on('closed', () => {
        win = null;
    });

    return win;
}