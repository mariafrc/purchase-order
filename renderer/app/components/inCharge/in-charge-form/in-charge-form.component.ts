import { Component, OnInit } from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {IpcService} from '~services/ipc.service';

@Component({
  selector: 'app-in-charge-form',
  templateUrl: './in-charge-form.component.html',
  styleUrls: ['./in-charge-form.component.scss']
})
export class InChargeFormComponent implements OnInit {
	inCharge: any;

  constructor(
  	public ref: DynamicDialogRef, 
  	public config: DynamicDialogConfig,
    private ipcService: IpcService
  ) { }

  ngOnInit(): void {
  	this.initInForm();
  }

  initInForm(){
  	this.inCharge = {
			id: null,
			name: '',
			phone: ''
		}

		if(this.config.data.action === 'edit'){
			this.inCharge = {...this.config.data.inCharge};
		}
  }

  async onSubmit(){
  	const action = (this.config.data.action === "add")
      ? 'create-incharge' 
      : 'update-incharge';
    
    const inCharge = await this.ipcService.execute(action, this.inCharge);
    this.ref.close(inCharge);
  }

}
