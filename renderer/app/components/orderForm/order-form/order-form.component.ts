import { Component, OnInit } from '@angular/core';
import {IpcService} from '~services/ipc.service';
import * as moment from 'moment';
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable'
import {Supplier} from '~interfaces/supplier.interface';
import {InCharge} from '~interfaces/in-charge.interface';
import {Article} from '~interfaces/article.interface';
import {OrderFormArticlesOutput} from '../order-form-articles/order-form-articles.component';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  loading: boolean;
	date: string = moment().format('YYYY/MM/DD');
  observation: string;
  fromArticlesForm: OrderFormArticlesOutput;
	
	inCharges: InCharge[];
  inChargeDropdownOptions: {label: string, value: InCharge}[]= [];
  selectedInCharge: InCharge;

  suppliers: Supplier[];
  supplierDropdownOptions: {label: string, value: Supplier}[] = [];
	selectedSupplier: Supplier;
	articles: Article[];

  constructor(
  	private ipcService: IpcService
  ) {}

  async ngOnInit(){
    this.loading = false;
    const result = await Promise.all([
      this.ipcService.execute('get-all-incharges'),
      this.ipcService.execute('get-all-suppliers')
    ])

  	this.inCharges = result[0] as InCharge[];
    for(let inCharge of this.inCharges){
      this.inChargeDropdownOptions.push({
        label: inCharge.name,
        value: inCharge
      })
    }
    this.selectedInCharge = this.inCharges[0];

    this.suppliers = result[1] as Supplier[];
  	for(let supplier of this.suppliers){
  		this.supplierDropdownOptions.push({
  			label: supplier.name,
  			value: supplier
  		})
  	}
  	this.selectedSupplier = this.suppliers[0];
  	this.articles = await this.ipcService.execute('get-all-articles', this.selectedSupplier.id) as Article[];
  }

  async onSupplierChange(){
    this.articles = await this.ipcService.execute('get-all-articles', this.selectedSupplier.id) as Article[];
  }

  onArticleChange(articlesFormData: OrderFormArticlesOutput){
    setTimeout(()=>{
      this.fromArticlesForm = articlesFormData;
    }, 500)
  }

  get expiration(){
    return moment().add(this.selectedSupplier.expiration, 'd').format('YYYY/MM/DD');
  }

  get articlesInTableFormat(){
    const output = [];

    for(let i=0; i<14; i++){
      if(this.fromArticlesForm.articles[i]){
        output.push([
          'L - ' + (i + 1),
          this.fromArticlesForm.articles[i].designation,
          this.fromArticlesForm.articles[i].unity,
          this.fromArticlesForm.articles[i].price,
          this.fromArticlesForm.articles[i].quantity,
          this.fromArticlesForm.articles[i].price * this.fromArticlesForm.articles[i].quantity
        ])
      } else {
        output.push(['---']);
      }
    }
    return output;
  }

  async onSave(){
    this.loading = true;
    await this.ipcService.execute('create-order-form', {
      date: this.date,
      expiration: this.expiration,
      observation: this.observation || 'aucune',
      payement: this.selectedSupplier.payement,
      inChargeId: this.selectedInCharge.id,
      supplierId: this.selectedSupplier.id,
      articles: this.fromArticlesForm.articles
    });

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Bon de commande", 15, 30);

    doc.setFontSize(18);
    doc.text("Votre Logo Ici", 155, 20);
    doc.text("Entreprise blabla", 150, 45);

    doc.setFontSize(16);
    doc.text(`Date: ${this.date}`, 85, 60);

    doc.text(`Fournisseur: ${this.selectedSupplier.name}`, 15, 80);

    autoTable(doc, {
      margin: { top: 90 },
      head: [['N°', 'Designation', 'Unité', 'PU (Ar)', 'Quantité', "Montant"]],
      body: this.articlesInTableFormat
    })

    doc.setFontSize(12);

    doc.text("Total Hors taxes:", 120, 230);
    doc.text(this.fromArticlesForm.total + " Ariary", 160, 230);

    doc.text("TVA:", 120, 235);
    doc.text(this.fromArticlesForm.calculedTVA + " Ariary", 160, 235);

    doc.text("Total TTC:", 120, 240);
    doc.text(this.fromArticlesForm.calculedTotal + " Ariary", 160, 240);

    doc.text("Arreté à la somme de " + this.fromArticlesForm.textTotal + " Ariary", 15, 250);
    doc.text(`Mode de payement: ${this.selectedSupplier.payement}`, 15, 255);
    doc.text(`Date d'échéance: ${this.expiration}`, 15, 260);
    doc.text(`observation: ${this.observation || 'Aucune'}`, 15, 265);

    doc.text("Le responsable", 110, 270);
    doc.text(this.selectedInCharge.name, 110, 275);

    doc.save("bon_de_commande.pdf");
  }
}
