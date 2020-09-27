import {createConnection, Connection} from "typeorm";

export async function initDatabase(){
	console.log("Initialize database...");
	await createConnection({
	    type: "mysql",
	    host: "localhost",
	    port: 3306,
	    username: "root",
	    password: "",
	    database: "bon_commande",
	    entities: []
	});
	console.log("Database initialized");
}