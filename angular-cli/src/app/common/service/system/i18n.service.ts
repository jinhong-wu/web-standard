import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  constructor(
		public translate: TranslateService,
    public http: HttpClient
  ) {
		// 国际化
		this.translate.use(window.sessionStorage.getItem("lang"));
		
    this.i18nLoading = true;
		this.http.get('assets/i18n/' + this.translate.currentLang + '.json').subscribe((res: any) => {
			this.i18nLoading = false;
      this.i18nList = res;
			this.baseList = res.base;
    })
  }

	// 国际化-数据
	i18nLoading: boolean = false;
	i18nList: any = {};
	baseList: any = {};

	promise(ok: Function) {
		let timer = setInterval(()=>{
			if (!this.i18nLoading) {
				clearInterval(timer);
				ok();
			}
		}, 500);
	}
}
