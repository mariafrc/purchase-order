import {createConnection, Connection} from "typeorm";
import {Article} from '../entities/Article';
import {InCharge} from '../entities/InCharge';
import {OrderForm} from '../entities/OrderForm';
import {OrderFormArticle} from '../entities/OrderFormArticle';
import {Supplier} from '../entities/Supplier';

export async function initDatabase(){
	console.log("Initialize database...");
	await createConnection({
	    type: "mysql",
	    host: "localhost",
	    port: 3306,
	    username: "root",
	    password: "",
	    database: "bon_commande",
	    entities: [
	    	Article,
				InCharge,
				OrderForm,
				OrderFormArticle,
				Supplier
			]
	});
	console.log("Database initialized");
}