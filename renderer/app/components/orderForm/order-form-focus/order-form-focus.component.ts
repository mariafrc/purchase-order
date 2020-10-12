import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IpcService} from '~services/ipc.service';
import {OrderForm} from '~interfaces/order-form.interface';
import * as moment from 'moment';

@Component({
  selector: 'app-order-form-focus',
  templateUrl: './order-form-focus.component.html',
  styleUrls: ['./order-form-focus.component.scss']
})
export class OrderFormFocusComponent implements OnInit {
	orderForm: OrderForm;
  constructor(
  	private route: ActivatedRoute,
  	private ipcService: IpcService
  ) { }

  async ngOnInit(){
  	this.orderForm = await this.ipcService.execute(
  		'get-one-order-form',
  		this.route.snapshot.params['id']
  	) as OrderForm;
  }

  get total(){
    let total = 0;
    for(const article of this.orderForm.articles){
      total += (article.price * article.quantity);
    }
    return total;
  }

  get tva(){
    return this.total * this.orderForm.supplier.tva / 100;
  }
}
