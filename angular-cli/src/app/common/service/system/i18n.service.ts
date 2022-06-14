import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
/**
 * @name 国际化
*/
@Injectable({
  providedIn: 'root',
})
export class I18nService {
  constructor(
		public translate: TranslateService,
    public nzI18n: NzI18nService,
    public http: HttpClient
  ) {
    this.lang = window.sessionStorage.getItem('lang') || 'zh';
    this.langLocale = this.lang == 'zh' ? zh_CN : en_US;
    window.sessionStorage.setItem('lang', this.lang);
		this.initI18n();
		this.use();
  }
  // 当前语言
  lang; // zh、en
  langLocale; // zh_CN、en_US
  // 国际化-数据
  loading: boolean = false;
  list: any = {};
  baseList: any = {};

  // 加载公共zh/en.json
  initI18n() {
		this.loading = true;
    this.http.get(`assets/i18n/${this.lang}.json`).subscribe((res: any) => {
      this.list = res;
      this.baseList = res.base;
      this.loading = false;
    });
  }

  // 语言-使用
  use() {
		this.translate.use(this.lang);
		this.nzI18n.setLocale(this.langLocale);
  }

	// 语言-切换
	changeLang(lang: 'zh' | 'en' = 'zh') {
		if (lang != this.lang) {
			window.sessionStorage.setItem('lang', lang);
			window.location.reload();
		}
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
