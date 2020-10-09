import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {IpcService} from '~services/ipc.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectionGuard implements CanActivate {
	constructor(
		private ipcService: IpcService,
		private router: Router
	){}
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean>{
    if(!await this.ipcService.execute('get-connection')){
    	this.router.navigate(['/connection']);
    	return false;
    }
    return true;
  }
  
}
