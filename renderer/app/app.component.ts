import { Component, OnInit } from '@angular/core';
import {ipcRenderer} from 'electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
	text: string = "loading";
  test = "hi";
  constructor(){}
  
  async ngOnInit(){
    
  }

  async onSend(){
    this.test = "you"
    ipcRenderer.send("test");
    
    this.text = await new Promise((resolve)=>{
      ipcRenderer.on("testReturn", (evt, data)=>{
        resolve(data);
      })
    })

  }
}
