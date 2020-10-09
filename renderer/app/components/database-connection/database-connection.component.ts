import { Component, OnInit } from '@angular/core';
import {IpcService} from '~services/ipc.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-database-connection',
  templateUrl: './database-connection.component.html',
  styleUrls: ['./database-connection.component.scss']
})
export class DatabaseConnectionComponent implements OnInit {
	connectionError: boolean;
  constructor(
    private ipcService: IpcService,
    private router: Router
  ) { }

  ngOnInit(): void {
  	this.onConnect();
  }

  async onConnect(){
  	this.connectionError = false;
  	if(await this.ipcService.connectDatabase()){
  		this.router.navigate(['/supplier']);
  	} else {
  		this.connectionError = true;
  	}
  }

}
