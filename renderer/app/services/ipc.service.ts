import { Injectable } from '@angular/core';
import {ipcRenderer} from 'electron';

@Injectable({
  providedIn: 'root'
})
export class IpcService {
	timeout = 5000;
  constructor() { }

  execute(request: string, data = null){
    return new Promise((resolve, reject)=>{
      if(data){
    	  ipcRenderer.send('request:' + request, data);
      } else {
        ipcRenderer.send('request:' + request);
      }
      
      setTimeout(()=>{
        reject('timeout error');
      }, this.timeout)

    	ipcRenderer.once(request, (event, response)=>{
        resolve(response);
    	})
    })
  }

  connectDatabase(): Promise<boolean>{
    return new Promise((resolve, reject)=>{
      ipcRenderer.send('request:connect-database');

      ipcRenderer.once('connect-database', (event, response: boolean)=>{
        resolve(response);
      })
    })
  }
}
