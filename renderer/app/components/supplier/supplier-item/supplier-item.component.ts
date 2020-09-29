import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {IpcService} from '~services/ipc.service';
import {DialogService} from 'primeng/dynamicdialog';
import {SupplierFormComponent} from '../supplier-form/supplier-form.component';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-supplier-item',
  templateUrl: './supplier-item.component.html',
  styleUrls: ['./supplier-item.component.scss'],
  providers: [ConfirmationService]
})
export class SupplierItemComponent implements OnInit {
	@Input() supplier!: any;
	@Output() edited: EventEmitter<any> = new EventEmitter()
  @Output() deleted: EventEmitter<number> = new EventEmitter()
  constructor(
  	public dialogService: DialogService,
  	private ipcService: IpcService,
    private confirmation: ConfirmationService
  ) { }

  ngOnInit(): void {
  }

  onEdit(){
  	const ref = this.dialogService.open(SupplierFormComponent, {
        header: 'Modification',
        width: '70%',
        data: {
          action: 'edit',
          supplier: this.supplier
        }
    });
    ref.onClose.subscribe((supplier) =>{
        if (supplier) {
          this.edited.emit(supplier);
        }
    });
  }

  onDelete(id: number){
    this.confirmation.confirm({
      message: 'Voulez-vous vraiment executer cet action?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      accept: async () => {
        await this.ipcService.execute('delete-supplier', id);
        this.deleted.emit(id);
      }
    })
  }
}
