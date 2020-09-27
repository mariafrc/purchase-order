import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from 'typeorm';
import {InCharge} from './InCharge';
import {Supplier} from './Supplier';
import {OrderFormArticle} from './OrderFormArticle';

@Entity()
export class OrderForm{
	@PrimaryGeneratedColumn()
	id: number;

	@Column({type: 'datetime'})
	date: string;

	@Column()
	expiration: string;

	@Column({type: 'text'})
	observation: string;

	@Column()
	payement: string;

	@ManyToOne(() => InCharge, (inCharge) => inCharge.orderForms)
	inCharge: InCharge;

	@Column()
	inChargeId: number;

	@ManyToOne(() => Supplier, (supplier) => supplier.orderForms)
	supplier: Supplier;

	@Column()
	supplierId: number;

	@OneToMany(() => OrderFormArticle, (article) => article.orderForm)
	articles: OrderFormArticle[];
}