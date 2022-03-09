import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
// 国际化
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
// ng-zorro-antd
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  FormOutline,
  DashboardOutline,
} from '@ant-design/icons-angular/icons';
// markdown
import { MarkdownModule } from 'ngx-markdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './common/layout/layout.component';
import { SharedModule } from './common/shared.module';
import { ComponentModule } from './common/component/component.module';
import { PipeModule } from './common/pipe/pipe.module';
import { Interceptor } from './common/interceptor/interceptor';
import { NzPipesModule } from 'ng-zorro-antd/pipes';

registerLocaleData(zh);
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, LayoutComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentModule,
    PipeModule,
    NzPipesModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    MarkdownModule.forRoot(),
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    {
      provide: NZ_ICONS,
      useValue: [
        MenuFoldOutline,
        MenuUnfoldOutline,
        DashboardOutline,
        FormOutline,
      ],
    },
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
