import { Component, OnInit } from '@angular/core';
import {IpcService} from '~services/ipc.service';
import {DialogService} from 'primeng/dynamicdialog';
import {InChargeFormComponent} from '../in-charge-form/in-charge-form.component';
import {ConfirmationService} from 'primeng/api';
import {InCharge} from '~interfaces/in-charge.interface';

@Component({
  selector: 'app-in-charge',
  templateUrl: './in-charge.component.html',
  styleUrls: ['./in-charge.component.scss'],
  providers: [DialogService, ConfirmationService]
})
export class InChargeComponent implements OnInit {
	inCharges: InCharge[];
  constructor(
  	public dialogService: DialogService,
    private confirmation: ConfirmationService,
  	private ipcService: IpcService,
  ) { }

  async ngOnInit(){
  	this.inCharges = await this.ipcService.execute('get-all-incharges') as InCharge[];
  }

  onAdd(){
  	const ref = this.dialogService.open(InChargeFormComponent, {
        header: 'Nouveau responsable',
        width: '70%',
        data: {
          action: 'add'
        }
    });
    ref.onClose.subscribe((inCharge) =>{
        if (inCharge) {
          this.inCharges.push(inCharge);
        }
    });
  }

  onEdit(id: number){
    const ref = this.dialogService.open(InChargeFormComponent, {
        header: 'Modification',
        width: '70%',
        data: {
          action: 'edit',
          inCharge: this.inCharges.find(i => i.id === id)
        }
    });
    ref.onClose.subscribe((inCharge) =>{
        if (inCharge) {
          const toEdit = this.inCharges.find(i => i.id === inCharge.id)
          toEdit.name = inCharge.name;
          toEdit.phone = inCharge.phone;
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
        await this.ipcService.execute('delete-incharge', id);
        this.inCharges = this.inCharges.filter(i => i.id !== id);
      }
    })
  }

}
