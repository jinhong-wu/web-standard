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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './common/layout/layout.component';
import { SharedModule } from './common/shared.module';
import { ComponentModule } from './common/component/component.module';
import { PipeModule } from './common/pipe/pipe.module';
import { Interceptor } from './common/interceptor/interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

registerLocaleData(zh);
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, 'assets/i18n/pages/', '.json');
}
@NgModule({
  declarations: [AppComponent, LayoutComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
		SharedModule,
    ComponentModule,
    PipeModule,
		TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
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
