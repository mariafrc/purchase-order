import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {Article} from './Article';
import {OrderForm} from './OrderForm';

@Entity()
export class Supplier{
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	nif: string;

	@Column()
	stat: string;

	@Column()
	phone: string;

	@Column()
	address: string;

	@Column({nullable: true})
	tva: number;

	@Column()
	expiration: number;

	@Column()
	payement: string;

	@OneToMany(() => Article, (article) => article.supplier)
	articles: Article[];

	@OneToMany(() => OrderForm, (orderForm) => orderForm.supplier)
	orderForms: OrderForm[];
}