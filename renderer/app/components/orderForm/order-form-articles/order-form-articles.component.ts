import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormArray, FormBuilder, Validators} from '@angular/forms';
import * as writtenNumber from 'written-number';
import {MessageService} from 'primeng/api';
import {Supplier} from '~interfaces/supplier.interface';
import {Article} from '~interfaces/article.interface';

export interface OrderFormArticlesOutput{
  articles: ArticleFormData[];
  total: number;
  calculedTVA: number;
  calculedTotal: number;
  textTotal: string;
}

export interface ArticleFormData{
  designation: string;
  unity: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-order-form-articles',
  templateUrl: './order-form-articles.component.html',
  styleUrls: ['./order-form-articles.component.scss'],
  providers: [MessageService]
})
export class OrderFormArticlesComponent implements OnInit {
  @Output() articleChange: EventEmitter<any> = new EventEmitter();
  @Input() supplier: Supplier;
	
  _articles: Article[];
  noArticle: boolean = false;
	@Input() set articles(inputArticles: Article[]){ 
    this.initArticles(inputArticles);  
  }
	get articles(){return this._articles}
	
  orderForm: FormGroup;
  articleOptions: {label: string, value: number}[];
  
  constructor(
  	private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
  	this.orderForm = this.fb.group({
  		articles: this.fb.array([])
  	});
  }

  initArticles(inputArticles: Article[]){
    if(inputArticles && inputArticles.length){
      this._articles = inputArticles;
      this.noArticle = false;
      
      //init options for dropdown
      this.articleOptions = [];
      for(const article of inputArticles){
        this.articleOptions.push({
          label: article.designation,
          value: article.id
        })
      }

      //reset articles form
      while(this.articleForm && this.articleForm.length){
        this.articleForm.removeAt(0);
      }
      
      this.onAddArticle();
    } else {
      this.noArticle = true;
      this.articleChange.emit([]);
    }
  }

  get articleForm(){
  	return this.orderForm.get('articles') as FormArray;
  }

  onAddArticle(){
    if(this.articleForm.length >=15){
      return this.messageService.add({
        severity: 'info', 
        summary: "Avertissement", 
        detail: "Vous avez dépassé la limite autorisée"
      });
    }
  	const article = this.fb.group({
      articleId: this.articles[0].id,
  		designation: [this.articles[0].designation, Validators.required],
  		unity: this.articles[0].unity,
  		price: this.articles[0].price,
  		quantity: 1
  	})

  	this.articleForm.push(article);
    this.emitValue();
  }

  onArticleChange(index: number){
    const id = this.articleForm.value[index].articleId;
    const article = this.articles.find(a => a.id === id);
    this.articleForm.controls[index].setValue({
      articleId: id,
      designation: article.designation,
      unity: article.unity,
      price: article.price,
      quantity: 1
    })
    this.emitValue();
  }

  onDeleteArticle(index: number){
  	this.articleForm.removeAt(index);
    this.emitValue();
  }

  // total calc
  get total(){
    let total = 0;
    for(const article of this.articleForm.controls){
      total += article.value.quantity * article.value.price;
    }
    return total
  }

  get calculedTVA(){
    return this.total * this.supplier.tva / 100;
  }

  get calculedTotal(){
    return this.total + this.calculedTVA;
  }

  get textTotal(){
    return writtenNumber(this.calculedTotal, {lang: 'fr'});
  }

  emitValue(){
    const output: OrderFormArticlesOutput = {
      articles: [],
      total: this.total,
      calculedTVA: this.calculedTVA,
      calculedTotal: this.calculedTotal,
      textTotal: this.textTotal
    };
    for(let article of this.articleForm.controls){
      const {articleId, ...articleData} = article.value;
      output.articles.push(articleData);
    }
    this.articleChange.emit(output);
  }

}
