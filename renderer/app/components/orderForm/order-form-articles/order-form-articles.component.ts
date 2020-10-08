import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormArray, FormBuilder, Validators} from '@angular/forms';
import * as writtenNumber from 'written-number';

@Component({
  selector: 'app-order-form-articles',
  templateUrl: './order-form-articles.component.html',
  styleUrls: ['./order-form-articles.component.scss']
})
export class OrderFormArticlesComponent implements OnInit {
  @Output() articleChange: EventEmitter<any> = new EventEmitter();
  @Input() supplier: any;
	
  _articles: any[];
  noArticle: boolean = false;
	@Input() set articles(data){ 
    this.initArticles(data);  
  }
	get articles(){return this._articles}
	
  orderForm: FormGroup;
  articleOptions: {label: string, value: number}[];
  
  constructor(
  	private fb: FormBuilder
  ) {}

  ngOnInit(): void {
  	this.orderForm = this.fb.group({
  		articles: this.fb.array([])
  	});
  }

  initArticles(data){
    if(data && data.length){
      this._articles = data;
      this.noArticle = false;
      
      //init options for dropdown
      this.articleOptions = [];
      for(const article of data){
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
  	const article = this.fb.group({
      articleId: this.articles[0].id,
  		designation: [this.articles[0].designation, Validators.required],
  		unity: this.articles[0].unity,
  		price: this.articles[0].price,
  		quantity: 0
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
      quantity: 0
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
    const output = {
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
