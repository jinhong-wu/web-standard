import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableHeadComponent } from './table-head/table-head.component';
import { SharedModule } from '../shared.module';
import { ImportFileComponent } from './import-file/import-file.component';



@NgModule({
  declarations: [
		TableHeadComponent,
		ImportFileComponent,
	],
  imports: [
    CommonModule,
		SharedModule
  ],
	exports: [
		TableHeadComponent,
		ImportFileComponent
	],
	entryComponents: [
		TableHeadComponent,
		ImportFileComponent
	]
})
export class ComponentModule { }
