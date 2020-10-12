import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {OrderForm} from './OrderForm';

@Entity()
export class InCharge{
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	phone: string;

	@Column({default: false})
	isDeleted: boolean;

	@OneToMany(() => OrderForm, (orderForm) => orderForm.inCharge)
	orderForms: OrderForm[];
}