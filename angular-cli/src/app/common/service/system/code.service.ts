import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { I18nService } from './i18n.service';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor(
    private http: HttpClient,
    private i18n: I18nService
  ) {
    this.loading = true;
    this.codeFn().subscribe((res: any) => {
      this.loading = false;
      this.list = res;
    });
  }

  loading: boolean = false;
  list = {};

  // 后台码表
  codeFn(moduleName: string = '') {
    return this.http.get('/system-management/api/v1/system/code/' + moduleName);
  }

  promise(ok: Function) {
    let timer = setInterval(() => {
      if (!this.loading) {
        clearInterval(timer);
        ok();
      }
    }, 500);
  }

  // 启用、禁用
  onOff = [
    { value: 'enable', label: this.i18n.baseList.enable },
    { value: 'disable', label: this.i18n.baseList.disable }
  ];
}
