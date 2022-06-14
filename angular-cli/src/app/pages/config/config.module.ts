import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigRoutingModule } from './config-routing.module';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { SharedModule } from 'src/app/common/shared.module';
import { ComponentModule } from 'src/app/common/component/component.module';
import { PipeModule } from 'src/app/common/pipe/pipe.module';
import { MarkdownModule } from 'ngx-markdown';

import { I18nComponent } from './i18n/i18n.component';
import { PdfComponent } from './pdf/pdf.component';
import { EchartsComponent } from './echarts/echarts.component';

@NgModule({
  declarations: [I18nComponent, PdfComponent, EchartsComponent],
  imports: [
    CommonModule,
    ConfigRoutingModule,
		NgxEchartsModule.forRoot({echarts: {init: echarts.init}}),
		SharedModule,
    ComponentModule,
    PipeModule,
    MarkdownModule.forChild(),
  ]
})
export class ConfigModule { }