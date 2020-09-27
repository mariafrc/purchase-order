import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {Supplier} from './Supplier';

@Entity()
export class Article{
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	designation: string;

	@Column()
	price: number;

	@Column()
	unity: string;

	@ManyToOne(() => Supplier, (supplier) => supplier.articles)
	supplier: Supplier;

	@Column()
	supplierId: number;
}