import {ipcMain} from 'electron';
import {getRepository} from 'typeorm';
import {Article} from '../entities/Article';
import {Supplier} from '../entities/Supplier';

interface ArticleData{
	designation: string;
	price: number;
	unity: string;
	supplierId: number;
}

export function articleController(){
	const articleRepository = getRepository(Article);
	const supplierRepository = getRepository(Supplier);
	
	ipcMain.on('request:get-all-acticles', async (event)=>{
		event.sender.send(
			'get-all-acticles', 
			await articleRepository.find()
		);
	})

	ipcMain.on('request:get-one-article', async (event, articleId: number)=>{
		event.sender.send(
			'get-one-article', 
			await articleRepository.findOne(articleId)
		);
	})

	ipcMain.on('request:create-article', async (event, articleData: ArticleData)=>{
		const {supplierId, ...data} = articleData;
		const supplier = await supplierRepository.findOne(supplierId);
		const article = await articleRepository.create({
			...data,
			supplier
		})
		event.sender.send(
			'create-article', 
			await articleRepository.save(article)
		);
	})

	ipcMain.on('request:update-article', async (event, article: Article)=>{
		const {id, supplierId, ...articleData} = article;
		await articleRepository.update(id, articleData);
		event.sender.send(
			'update-article', 
			await articleRepository.findOne(id)
		);
	})

	ipcMain.on('request:delete-article', async (event, id: number)=>{
		const article = await articleRepository.findOne(id);
		event.sender.send(
			'delete-article',
			await articleRepository.remove(article)
		);
	})
}