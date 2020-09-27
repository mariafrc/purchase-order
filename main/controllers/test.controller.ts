import {ipcMain, BrowserWindow} from 'electron';
import {getConnection} from 'typeorm';

const connection = getConnection();

export function testController(){
	ipcMain.on('test', (event, arg)=>{
		event.sender.send('test');
	})
}