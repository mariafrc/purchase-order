import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IpcService} from '~services/ipc.service';
import {DialogService} from 'primeng/dynamicdialog';
import {ConfirmationService} from 'primeng/api';
import {ArticleFormComponent} from '../article-form/article-form.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [DialogService, ConfirmationService]
})
export class ArticleComponent implements OnInit {
	supplier: any;
	articles: any;
  constructor(
  	private route: ActivatedRoute,
  	public dialogService: DialogService,
    private confirmation: ConfirmationService,
    private ipcService: IpcService,
  ) { }

  async ngOnInit(){
  	this.supplier = await this.ipcService.execute(
  		'get-one-supplier', 
  		this.route.snapshot.params['id']
  	);
  	this.articles = await this.ipcService.execute(
  		'get-all-articles',
  		this.route.snapshot.params['id']
  	)
  }

  onAdd(){
    const ref = this.dialogService.open(ArticleFormComponent, {
        header: 'Nouveau responsable',
        width: '70%',
        data: {
          action: 'add',
          supplierId: this.supplier.id
        }
    });
    ref.onClose.subscribe((article) =>{
        if (article) {
          this.articles.push(article);
        }
    });
  }

  onEdit(id: number){
    const ref = this.dialogService.open(ArticleFormComponent, {
        header: 'Modification',
        width: '70%',
        data: {
          action: 'edit',
          supplierId: this.supplier.id,
          article: this.articles.find(a => a.id === id)
        }
    });
    ref.onClose.subscribe((article) =>{
        if (article) {
          const toEdit = this.articles.find(a => a.id === article.id);
          toEdit.designation = article.designation;
          toEdit.price = article.price;
          toEdit.unity = article.unity;
        }
    });
  }

  onDelete(id: number){
    this.confirmation.confirm({
      message: 'Voulez-vous vraiment executer cet action?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      accept: async () => {
        await this.ipcService.execute('delete-article', id);
        this.articles = this.articles.filter(a => a.id !== id);
      }
    })
  }
}
