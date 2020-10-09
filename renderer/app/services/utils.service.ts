import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  translatePayement(payementType: string){
  	switch (payementType) {
  		case "cash": return 'Liquide';
  		case "cheque": return 'Chèque';
  		case "transfert": return 'Virement';
  	}
  }
}
