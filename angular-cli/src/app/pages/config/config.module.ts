import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigRoutingModule } from './config-routing.module';
import { SharedModule } from 'src/app/common/shared.module';
import { ComponentModule } from 'src/app/common/component/component.module';
import { PipeModule } from 'src/app/common/pipe/pipe.module';
import { MarkdownModule } from 'ngx-markdown';
import { I18nComponent } from './i18n/i18n.component';
import { PdfComponent } from './pdf/pdf.component';


@NgModule({
  declarations: [I18nComponent, PdfComponent],
  imports: [
    CommonModule,
    ConfigRoutingModule,
		SharedModule,
    ComponentModule,
    PipeModule,
    MarkdownModule.forChild(),
  ]
})
export class ConfigModule { }