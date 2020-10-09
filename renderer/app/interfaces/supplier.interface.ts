export interface Supplier{
	id: number;
	name: string;
	nif: string;
	stat: string;
	phone: string;
	address: string;
	tva?: number;
	expiration: number;
	payement: string;
}