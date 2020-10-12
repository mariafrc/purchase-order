import { Component, OnInit } from '@angular/core';
import {IpcService} from '~services/ipc.service';
import {UtilsService} from '~services/utils.service';
import * as moment from 'moment';
import {Supplier} from '~interfaces/supplier.interface';
import {InCharge} from '~interfaces/in-charge.interface';
import {Article} from '~interfaces/article.interface';
import {ArticleFormData} from '../order-form-articles/order-form-articles.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  loading: boolean;
  translatePayement = this.utils.translatePayement;
	date: string = moment().format('YYYY/MM/DD');
  observation: string;
  fromArticlesForm: ArticleFormData[] = [];
	
	inCharges: InCharge[];
  inChargeDropdownOptions: {label: string, value: InCharge}[]= [];
  selectedInCharge: InCharge;

  suppliers: Supplier[];
  supplierDropdownOptions: {label: string, value: Supplier}[] = [];
	selectedSupplier: Supplier;
	articles: Article[];

  constructor(
  	private ipcService: IpcService,
    private router: Router,
    private utils: UtilsService
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

  onArticleChange(articlesFormData: ArticleFormData[]){
    setTimeout(()=>{
      this.fromArticlesForm = articlesFormData;
    }, 500)
  }

  get expiration(){
    return moment().add(this.selectedSupplier.expiration, 'd').format('YYYY/MM/DD');
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
      articles: this.fromArticlesForm
    });

    this.router.navigate(['/orderForm/list']);

  }
}
