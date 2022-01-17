import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { MarkdownModule } from 'ngx-markdown';
import { SharedModule } from 'src/app/common/shared.module';

import { ClassComponent } from './class/class.component';
import { TableComponent } from './table/table.component';
import { ComponentModule } from 'src/app/common/component/component.module';
import { ModalComponent } from './modal/modal.component';
import { ModalCreateComponent } from './modal/modal-create/modal-create.component';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  declarations: [
		TableComponent,
		ClassComponent,
		ModalComponent,
		ModalCreateComponent,
		UploadComponent
	],
  imports: [
    CommonModule,
    PublicRoutingModule,
		SharedModule,
		ComponentModule,
		MarkdownModule.forChild(), 
  ],
	entryComponents: [
		ModalCreateComponent
	]
})
export class PublicModule { }
