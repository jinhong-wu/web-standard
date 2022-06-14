import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { I18nService } from './i18n.service';
/**
 * @name 码表
*/
@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor(
    private http: HttpClient,
    private i18n: I18nService
  ) {
    this.loading = true;
    this.initCode().subscribe((res: any) => {
      this.list = res;
      this.loading = false;
    });
  }

  loading: boolean = false;
  list = {};

  // 后台码表
  initCode(moduleName: string = '') {
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
