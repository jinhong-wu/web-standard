import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  constructor(
    public translate: TranslateService,
    public i18n: NzI18nService,
    public http: HttpClient
  ) {
    this.lang = window.sessionStorage.getItem('lang') || 'zh';
    this.langLocale = this.lang == 'zh' ? zh_CN : en_US;
    window.sessionStorage.setItem('lang', this.lang);
    this.use();

    this.loading = true;
    this.jsonFn().subscribe((res: any) => {
      this.loading = false;
      this.list = res;
      this.baseList = res.base;
    });
  }
  // 当前语言
  lang; // zh、en
  langLocale; // zh_CN、en_US
  // 国际化-数据
  loading: boolean = false;
  list: any = {};
  baseList: any = {};

  // 语言-切换、使用
  use(lang?: 'zh' | 'en') {
    if (lang) {
      window.sessionStorage.setItem('lang', lang);
      window.location.reload();
    } else {
      this.translate.use(this.lang);
      this.i18n.setLocale(this.langLocale);
    }
  }

  // 加载zh/en.json
  jsonFn(url: string = '') {
    if (url) url += '/';
    return this.http.get(
      `assets/i18n/${url}${this.translate.currentLang}.json`
    );
  }

  promise(ok: Function) {
    let timer = setInterval(() => {
      if (!this.loading) {
        clearInterval(timer);
        ok();
      }
    }, 500);
  }
}
