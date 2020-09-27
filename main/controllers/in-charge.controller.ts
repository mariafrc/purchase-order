import {ipcMain} from 'electron';
import {getRepository} from 'typeorm';
import {InCharge} from '../entities/InCharge';

interface InChargeData{
	name: string;
	phone: string;
}

export function inChargeController(){
	const inChargeRepository = getRepository(InCharge);
	
	ipcMain.on('request:get-all-incharges', async (event)=>{
		event.sender.send(
			'get-all-incharges', 
			await inChargeRepository.find()
		);
	})

	ipcMain.on('request:get-one-incharge', async (event, inChargeId: number)=>{
		event.sender.send(
			'get-one-incharge', 
			await inChargeRepository.findOne(inChargeId)
		);
	})

	ipcMain.on('request:create-incharge', async (event, inChargeData: InChargeData)=>{
		const inCharge = inChargeRepository.create(inChargeData);
		await inChargeRepository.save(inCharge);
		event.sender.send(
			'create-incharge', 
			await inChargeRepository.save(inCharge)
		);
	})

	ipcMain.on('request:update-incharge', async (event, inCharge: InCharge)=>{
		const {id, ...inChargeData} = inCharge;
		await inChargeRepository.update(id, inChargeData);
		event.sender.send(
			'update-incharge', 
			await inChargeRepository.findOne(id)
		);
	})

	ipcMain.on('request:delete-incharge', async (event, id: number)=>{
		const inCharge = await inChargeRepository.findOne(id);
		event.sender.send(
			'delete-incharge',
			await inChargeRepository.remove(inCharge)
		);
	})
}