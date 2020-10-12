import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from 'typeorm';
import {InCharge} from './InCharge';
import {Supplier} from './Supplier';
import {OrderFormArticle} from './OrderFormArticle';

@Entity()
export class OrderForm{
	@PrimaryGeneratedColumn()
	id: number;

	@Column({type: 'date'})
	date: string;

	@Column({type: 'date'})
	expiration: string;

	@Column({type: 'text'})
	observation: string;

	@Column()
	payement: string;

	@ManyToOne(() => InCharge, (inCharge) => inCharge.orderForms)
	inCharge: InCharge;

	@ManyToOne(() => Supplier, (supplier) => supplier.orderForms)
	supplier: Supplier;

	@OneToMany(() => OrderFormArticle, (article) => article.orderForm, {onDelete: "CASCADE"})
	articles: OrderFormArticle[];
}