import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { MarkdownModule } from 'ngx-markdown';
import { SharedModule } from 'src/app/common/shared.module';
import { PublicComponent } from './public.component';

import { ClassComponent } from './class/class.component';
import { TableComponent } from './table/table.component';
import { ComponentModule } from 'src/app/common/component/component.module';
import { ModalComponent } from './modal/modal.component';
import { ModalCreateComponent } from './modal/modal-create/modal-create.component';
import { UploadComponent } from './upload/upload.component';
import { FormComponent } from './form/form.component';
import { MenuComponent } from './menu/menu.component';
import { MenuCreateComponent } from './menu/menu-create/menu-create.component';
import { InputComponent } from './input/input.component';
import { PipeComponent } from './pipe/pipe.component';
import { SelectComponent } from './select/select.component';
import { SelectOpenComponent } from './select/select-open/select-open.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { PipeModule } from 'src/app/common/pipe/pipe.module';
import { MenuOverviewComponent } from './menu/menu-overview/menu-overview.component';
import { ServiceComponent } from './service/service.component';
import { TreeComponent } from './tree/tree.component';
import { OtherComponent } from './other/other.component';
import { BaseComponent } from './ts/base/base.component';
import { UtilComponent } from './ts/util/util.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, 'assets/i18n/public/', '.json');
}

@NgModule({
  declarations: [
		PublicComponent,
    TableComponent,
    ClassComponent,
    ModalComponent,
    ModalCreateComponent,
    UploadComponent,
    FormComponent,
    MenuComponent,
    MenuCreateComponent,
    InputComponent,
    PipeComponent,
    SelectComponent,
    SelectOpenComponent,
    MenuListComponent,
    MenuOverviewComponent,
    ServiceComponent,
    TreeComponent,
    OtherComponent,
    BaseComponent,
    UtilComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
    ComponentModule,
    PipeModule,
		TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MarkdownModule.forChild(),
  ],
  entryComponents: [ModalCreateComponent, SelectOpenComponent],
})
export class PublicModule {}
