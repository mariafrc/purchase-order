import { NgModule } from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ToastModule} from 'primeng/toast';
import {CardModule} from 'primeng/card';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {TooltipModule} from 'primeng/tooltip';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {TableModule} from 'primeng/table';
import {PanelModule} from 'primeng/panel';
import {SelectButtonModule} from 'primeng/selectbutton';

const primengModules = [
	InputTextModule,
	ButtonModule,
	DropdownModule,
	ToastModule,
	CardModule,
	MessagesModule,
	MessageModule,
	TooltipModule,
	ConfirmDialogModule,
	DynamicDialogModule,
	TableModule,
	PanelModule,
	SelectButtonModule
];

@NgModule({
  imports: primengModules,
  exports: primengModules
})
export class PrimengModule { }
