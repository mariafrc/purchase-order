import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-in-charge-item',
  templateUrl: './in-charge-item.component.html',
  styleUrls: ['./in-charge-item.component.scss']
})
export class InChargeItemComponent implements OnInit {
	@Input() inCharge: any;
	@Output() edit: EventEmitter<number> = new EventEmitter();
	@Output() delete: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onEdit(){
  	this.edit.emit(this.inCharge.id);
  }

  onDelete(){
  	this.delete.emit(this.inCharge.id);
  }

}
