import { Component, OnInit } from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IpcService} from '~services/ipc.service';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss']
})
export class SupplierFormComponent implements OnInit {
  id: number;
	supplierForm: FormGroup;

  constructor(
  	public ref: DynamicDialogRef, 
  	public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private ipcService: IpcService
  ) { }

  ngOnInit(): void {
  	this.initSupplier();
  }

  initSupplier(){
    this.supplierForm = this.fb.group({
      id: null,
      name: ["", Validators.required],
      nif: ["", Validators.required],
      stat: ["", Validators.required],
      phone: ["", Validators.required],
      address: ["", Validators.required],
      tva: 0,
      expiration: [0, Validators.required],
      payement: ["", Validators.required]
    })

  	if(this.config.data.action === "edit"){  	
      this.supplierForm.patchValue(this.config.data.supplier);      
  	}
  }

  async onSubmit(){
    const action = (this.config.data.action === "add")
      ? 'create-supplier' 
      : 'update-supplier';
    
    const supplier = await this.ipcService.execute(action, this.supplierForm.value);
    this.ref.close(supplier);
  }
}
