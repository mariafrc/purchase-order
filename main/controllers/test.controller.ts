import {ipcMain, BrowserWindow} from 'electron';
import {getConnection} from 'typeorm';

export function testController(){
	const connection = getConnection();
	
	ipcMain.on('test', (event, arg)=>{
		event.sender.send('test');
	})
}