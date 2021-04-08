import { Component, OnInit } from '@angular/core';
import {IpcService} from '~services/ipc.service';
import {OrderForm} from '~interfaces/order-form.interface';
import {OrderFormArticle} from '~interfaces/order-form-article.interface';
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable'
import * as writtenNumber from 'written-number';
import {Supplier} from '~interfaces/supplier.interface';
import {InCharge} from '~interfaces/in-charge.interface';
import {UtilsService} from '~services/utils.service';

@Component({
  selector: 'app-order-form-list',
  templateUrl: './order-form-list.component.html',
  styleUrls: ['./order-form-list.component.scss']
})
export class OrderFormListComponent implements OnInit {
  loading: boolean;
	orderForms: OrderForm[];

  selectedDate: string = '';

  inCharges: InCharge[];
  inChargeDropdownOptions: {label: string, value: number}[]= [];
  selectedInCharge: number = 0;

  suppliers: Supplier[];
  supplierDropdownOptions: {label: string, value: number}[] = [];
  selectedSupplier: number = 0;
  
  constructor(
  	private ipcService: IpcService,
    private utils: UtilsService
  ) { }

  async ngOnInit() {
    this.loading = false;
  	this.orderForms = await this.ipcService.execute('get-all-order-forms') as OrderForm[];

    const result = await Promise.all([
      this.ipcService.execute('get-with-deleted-incharges'),
      this.ipcService.execute('get-with-deleted-suppliers')
    ]);

    this.inCharges = result[0] as InCharge[];
    for(let inCharge of this.inCharges){
      this.inChargeDropdownOptions.push({
        label: inCharge.name,
        value: inCharge.id
      });
    }
    this.inChargeDropdownOptions.push({label: '-----------', value: 0})

    this.suppliers = result[1] as Supplier[];
    for(let supplier of this.suppliers){
      this.supplierDropdownOptions.push({
        label: supplier.name,
        value: supplier.id
      });
    }
    this.supplierDropdownOptions.push({label: '-----------', value: 0});
  }

  get filteredOrderForms(){
    let output: OrderForm[] = this.orderForms || [];

    if(this.selectedDate){
      output = output.filter(of => of.date === this.selectedDate);
    }
    if(this.selectedSupplier){
      output = output.filter(of => of.supplier.id === this.selectedSupplier);
    }
    if(this.selectedInCharge){
      output = output.filter(of => of.inCharge.id === this.selectedInCharge);
    }

    return output;
  }

  onReset(){
    this.selectedDate = '';
    this.selectedSupplier = 0;
    this.selectedInCharge = 0;
  }

  /* ----------- Export part --------------- */
  articlesInTableFormat(articles: OrderFormArticle[]){
    const output = [];

    for(let i=0; i<14; i++){
      if(articles[i]){
        output.push([
          'L - ' + (i + 1),
          articles[i].designation,
          articles[i].unity,
          articles[i].price,
          articles[i].quantity,
          articles[i].price * articles[i].quantity
        ])
      } else {
        output.push(['---']);
      }
    }
    return output;
  }

  onExport(orderForm: OrderForm){
    this.loading = true;
    let total = 0;
    for(const article of orderForm.articles){
      total += (article.price * article.quantity);
    }
    const tva = total * orderForm.supplier.tva / 100;

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Bon de commande", 15, 30);

    doc.setFontSize(18);
    doc.text("Votre Logo Ici", 155, 20);
    doc.text("Entreprise blabla", 150, 45);

    doc.setFontSize(14);
    doc.text(`BC N°: ${orderForm.id}_${orderForm.supplier.name}(${orderForm.date})`, 85, 60);
    doc.text(`Date: ${orderForm.date}`, 85, 67);

    doc.text(`Fournisseur: ${orderForm.supplier.name}`, 15, 80);
    doc.text(`Contact: ${orderForm.supplier.phone}`, 15, 87);

    doc.text("Responsable e/se: RAKOTOBE J. C.", 105, 80);
    doc.text("Téléphone: 033 65 231 12", 105, 87);

    autoTable(doc, {
      margin: { top: 95 },
      head: [['N°', 'Designation', 'Unité', 'PU (Ar)', 'Quantité', "Montant"]],
      body: this.articlesInTableFormat(orderForm.articles)
    })

    doc.setFontSize(12);

    doc.text("Total Hors taxes:", 120, 230);
    doc.text(total + " Ariary", 160, 230);

    doc.text("TVA:", 120, 235);
    doc.text(tva + " Ariary", 160, 235);

    doc.text("Total TTC:", 120, 240);
    doc.text((total+tva) + " Ariary", 160, 240);

    doc.text("Arreté à la somme de " + writtenNumber((total+tva), {lang: 'fr'}) + " Ariary", 15, 250);
    doc.text(`Mode de payement: ${this.utils.translatePayement(orderForm.payement)}`, 15, 255);
    doc.text(`Date d'échéance: ${orderForm.expiration}`, 15, 260);
    doc.text(`observation: ${orderForm.observation || 'Aucune'}`, 15, 265);

    doc.text("Le responsable", 110, 270);
    doc.text(orderForm.inCharge.name, 110, 275);

    doc.save(`${orderForm.id}_${orderForm.supplier.name}(${orderForm.date}).pdf`);
    this.loading = false;
  }

}
