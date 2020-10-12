import {InCharge} from './in-charge.interface';
import {Supplier} from './supplier.interface';
import {OrderFormArticle} from './order-form-article.interface';

export interface OrderForm{
	id: number;
	date: string;
	expiration: string;
	observation: string;
	payement: string;
	inCharge: InCharge;
	supplier: Supplier;
	articles: OrderFormArticle[];
}