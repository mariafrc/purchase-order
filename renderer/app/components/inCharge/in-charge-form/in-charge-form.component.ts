import { Component, OnInit } from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {IpcService} from '~services/ipc.service';

@Component({
  selector: 'app-in-charge-form',
  templateUrl: './in-charge-form.component.html',
  styleUrls: ['./in-charge-form.component.scss']
})
export class InChargeFormComponent implements OnInit {
	inChargeForm: FormGroup;
  loading: boolean;

  constructor(
  	public ref: DynamicDialogRef, 
  	public config: DynamicDialogConfig,
    private ipcService: IpcService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  	this.initInForm();
    this.loading = false;
  }

  initInForm(){
  	this.inChargeForm = this.fb.group({
			id: null,
			name: ['', Validators.required],
			phone: ['', [
        Validators.required,
        Validators.pattern(new RegExp('03[2|3|4|9][0-9]{7,7}'))
      ]]
		})

		if(this.config.data.action === 'edit'){
			this.inChargeForm.patchValue(this.config.data.inCharge);
		}
  }

  async onSubmit(){
    this.loading = true;
  	const action = (this.config.data.action === "add")
      ? 'create-incharge' 
      : 'update-incharge';
    
    const inCharge = await this.ipcService.execute(action, this.inChargeForm.value);
    this.ref.close(inCharge);
  }

}
