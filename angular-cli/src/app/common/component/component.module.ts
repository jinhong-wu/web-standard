import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableHeadComponent } from './table-head/table-head.component';
import { SharedModule } from '../shared.module';



@NgModule({
  declarations: [
		TableHeadComponent
	],
  imports: [
    CommonModule,
		SharedModule
  ],
	exports: [
		TableHeadComponent
	],
	entryComponents: [
		TableHeadComponent
	]
})
export class ComponentModule { }
