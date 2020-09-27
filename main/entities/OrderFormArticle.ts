import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {OrderForm} from './OrderForm';

@Entity()
export class OrderFormArticle{
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	quantity: number;

	@Column()
	designation: string;

	@Column()
	price: number;

	@Column()
	unity: string;

	@ManyToOne(() => OrderForm, (orderForm) => orderForm.articles)
	orderForm: OrderForm;

	@Column()
	orderFormId: number;
}