import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { MarkdownModule } from 'ngx-markdown';
import { SharedModule } from 'src/app/common/shared.module';

import { ClassComponent } from './class/class.component';
import { TableComponent } from './table/table.component';
import { ComponentModule } from 'src/app/common/component/component.module';

@NgModule({
  declarations: [
		TableComponent,
		ClassComponent
	],
  imports: [
    CommonModule,
    PublicRoutingModule,
		SharedModule,
		ComponentModule,
		MarkdownModule.forChild(), 
  ]
})
export class PublicModule { }
