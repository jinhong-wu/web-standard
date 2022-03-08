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
import { FormComponent } from './form/form.component';
import { MenuComponent } from './menu/menu.component';
import { MenuCreateComponent } from './menu/menu-create/menu-create.component';
import { HttpComponent } from './http/http.component';
import { InputComponent } from './input/input.component';
import { PipeComponent } from './pipe/pipe.component';
import { PipeModule } from 'src/app/common/pipe/pipe.module';
import { SelectComponent } from './select/select.component';
import { NameComponent } from './name/name.component';
import { SelectOpenComponent } from './select/select-open/select-open.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';

@NgModule({
  declarations: [
    TableComponent,
    ClassComponent,
    ModalComponent,
    ModalCreateComponent,
    UploadComponent,
    FormComponent,
    MenuComponent,
    MenuCreateComponent,
    HttpComponent,
    InputComponent,
    PipeComponent,
    SelectComponent,
    SelectOpenComponent,
    NameComponent,
    MenuListComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
    ComponentModule,
    PipeModule,
    MarkdownModule.forChild(),
  ],
  entryComponents: [ModalCreateComponent, SelectOpenComponent],
})
export class PublicModule {}
