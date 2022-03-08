import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  constructor(public translate: TranslateService, public http: HttpClient) {
    // 国际化
    this.translate.use(window.sessionStorage.getItem('lang'));

    this.loading = true;
    this.http
      .get('assets/i18n/' + this.translate.currentLang + '.json')
      .subscribe((res: any) => {
        this.loading = false;
        this.list = res;
        this.baseList = res.base;
      });
  }

  // 国际化-数据
  loading: boolean = false;
  list: any = {};
  baseList: any = {};

  promise(ok: Function) {
    let timer = setInterval(() => {
      if (!this.loading) {
        clearInterval(timer);
        ok();
      }
    }, 500);
  }
}
