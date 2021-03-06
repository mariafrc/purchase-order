import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Article} from '~interfaces/article.interface';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss']
})
export class ArticleItemComponent implements OnInit {
	@Input() article: Article;
	@Output() edit: EventEmitter<number> = new EventEmitter();
	@Output() delete: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onEdit(){
  	this.edit.emit(this.article.id);
  }

  onDelete(){
  	this.delete.emit(this.article.id);
  }

}
