import {ipcMain} from 'electron';
import {getRepository} from 'typeorm';
import {Supplier} from '../entities/Supplier';

interface SupplierData{
	name: string;
	nif: string;
	stat: string;
	phone: string;
	address: string;
	tva: number;
	expiration?: number;
	payement: string;
}

export function supplierController(){
	const supplierRepository = getRepository(Supplier);
	
	ipcMain.on('request:get-all-suppliers', async (event)=>{
		event.sender.send(
			'get-all-suppliers', 
			await supplierRepository.find()
		);
	})

	ipcMain.on('request:get-one-supplier', async (event, supplierId: number)=>{
		event.sender.send(
			'get-one-supplier', 
			await supplierRepository.findOne(supplierId)
		);
	})

	ipcMain.on('request:create-supplier', async (event, supplierData: SupplierData)=>{
		const supplier = supplierRepository.create(supplierData);
		event.sender.send(
			'create-supplier', 
			await supplierRepository.save(supplier)
		);
	})

	ipcMain.on('request:update-supplier', async (event, supplier: Supplier)=>{
		const {id, ...supplierData} = supplier;
		await supplierRepository.update(id, supplierData);
		event.sender.send(
			'update-supplier', 
			await supplierRepository.findOne(id)
		);
	})

	ipcMain.on('request:delete-supplier', async (event, id: number)=>{
		const supplier = await supplierRepository.findOne(id);
		event.sender.send(
			'delete-supplier',
			await supplierRepository.remove(supplier)
		);
	})
}