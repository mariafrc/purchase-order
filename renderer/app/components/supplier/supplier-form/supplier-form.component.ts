import { Component, OnInit } from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IpcService} from '~services/ipc.service';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss']
})
export class SupplierFormComponent implements OnInit {
  id: number;
	supplierForm: FormGroup;
  loading: boolean;
  payementOptions: SelectItem[] = [
    {label:'Liquide', value: 'cash'},
    {label:'Chèque', value: 'cheque'},
    {label:'Virement', value: 'transfert'}
  ]

  constructor(
  	public ref: DynamicDialogRef, 
  	public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private ipcService: IpcService
  ) { }

  ngOnInit(): void {
  	this.initSupplier();
    this.loading = false;
  }

  initSupplier(){
    this.supplierForm = this.fb.group({
      id: null,
      name: ["", Validators.required],
      nif: ["", Validators.required],
      stat: ["", Validators.required],
      phone: ["", [
        Validators.required, 
        Validators.pattern(new RegExp('03[2|3|4|9][0-9]{7,7}'))
      ]],
      address: ["", Validators.required],
      tva: 0,
      expiration: [1, Validators.required],
      payement: ["cash", Validators.required]
    })

  	if(this.config.data.action === "edit"){  	
      this.supplierForm.patchValue(this.config.data.supplier);      
  	}
  }

  async onSubmit(){
    this.loading = true;
    const action = (this.config.data.action === "add")
      ? 'create-supplier' 
      : 'update-supplier';
    
    const supplier = await this.ipcService.execute(action, this.supplierForm.value);
    this.ref.close(supplier);
  }
}
