import {ipcMain} from 'electron';
import {getRepository} from 'typeorm';
import {InCharge} from '../entities/InCharge';
import {Supplier} from '../entities/Supplier';
import {OrderFormArticle} from '../entities/OrderFormArticle';
import {OrderForm} from '../entities/OrderForm';

interface OrderFormArticleData{
	quantity: number;
	designation: string;
	price: number;
	unity: string;
}

interface OrderFormData{
	date: string;
	expiration: string;
	observation: string;
	payement: string;
	inChargeId: number;
	supplierId: number;
	articles: OrderFormArticleData[];
}

export function orderFormController(){
	const orderFormRepository = getRepository(OrderForm);
	const inChargeRepository = getRepository(InCharge);
	const supplierRepository = getRepository(Supplier);
	const articleRepository = getRepository(OrderFormArticle);
	
	ipcMain.on('request:get-all-order-forms', async (event)=>{
		event.sender.send(
			'get-all-order-forms', 
			await orderFormRepository.find({relations: ['supplier', 'inCharge', 'articles']})
		);
	})

	ipcMain.on('request:get-one-order-form', async (event, orderFormId: number)=>{
		event.sender.send(
			'get-one-order-form', 
			await orderFormRepository.findOne(orderFormId, {relations: ['supplier', 'inCharge', 'articles']})
		);
	})

	ipcMain.on('request:create-order-form', async (event, orderFormData: OrderFormData)=>{
		//create order form
		const {supplierId, inChargeId, articles, ...data} = orderFormData;
		const [supplier, inCharge] = await Promise.all([
			supplierRepository.findOne(supplierId),
			inChargeRepository.findOne(inChargeId)
		]);
		const orderForm = orderFormRepository.create({
			...data,
			supplier,
			inCharge
		})
		await orderFormRepository.save(orderForm);

		//add articles
		const articlesList = [];
		for(const articleData of articles){
			articlesList.push(await articleRepository.create({...articleData, orderForm}));
		}
		await articleRepository.save(articlesList);

		event.sender.send(
			'create-order-form', 
			orderForm
		);
	})
}