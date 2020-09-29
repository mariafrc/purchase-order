import { Component, OnInit } from '@angular/core';
import {IpcService} from '~services/ipc.service';
import {DialogService} from 'primeng/dynamicdialog';
import {SupplierFormComponent} from '../supplier-form/supplier-form.component';


@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss'],
  providers: [DialogService]
})
export class SupplierComponent implements OnInit {
	suppliers;
  constructor(
  	public dialogService: DialogService,
  	private ipcService: IpcService,
    
  ) { }

  async ngOnInit() {
  	this.suppliers = await this.ipcService.execute('get-all-suppliers');
  }

  onAdd(){
  	const ref = this.dialogService.open(SupplierFormComponent, {
        header: 'Nouveau fournisseur',
        width: '70%',
        data: {
          action: 'add'
        }
    });
    ref.onClose.subscribe((supplier) =>{
        if (supplier) {
          this.suppliers.push(supplier);
        }
    });
  }

  onEdited(supplier){
    const toEdit = this.suppliers.find(s => s.id === supplier.id);
    toEdit.name = supplier.name;
    toEdit.nif = supplier.nif;
    toEdit.stat = supplier.stat;
    toEdit.phone = supplier.phone;
    toEdit.address = supplier.address;
    toEdit.tva = supplier.tva;
    toEdit.expiration = supplier.expiration;
    toEdit.payement = supplier.payement;
  }

  onDeleted(id: number){
    this.suppliers = this.suppliers.filter(s => s.id !== id);
  }

}
