import { Component, OnInit } from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {IpcService} from '~services/ipc.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {
	article: any;

  constructor(
  	public ref: DynamicDialogRef, 
  	public config: DynamicDialogConfig,
    private ipcService: IpcService
  ) { }

  ngOnInit() {
  	this.initArticle();
  }

  initArticle(){
  	this.article = {
  		id: null,
  		designation: '',
  		price: 1,
  		unity: ''
  	}

  	if(this.config.data.action === 'edit'){
  		this.article = {...this.config.data.article};
  	}
  }

  async onSubmit(){
  	const action = (this.config.data.action === "add")
      ? 'create-article' 
      : 'update-article';
    
    const article = await this.ipcService.execute(action, {
    	...this.article,
    	supplierId: this.config.data.supplierId
    });
    this.ref.close(article);
  }

}
