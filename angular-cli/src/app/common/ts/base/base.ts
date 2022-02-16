import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuService } from '../../service/system/menu.service';
import { TipService } from '../../service/tip/tip.service';
import { I18nService } from '../../service/system/i18n.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { httpUtil } from '../util/http.util';

export class BaseTs {
  public translate: TranslateService;
  public http: HttpClient;
  public router: Router;
  public activatedRoute: ActivatedRoute;
  public nzModal: NzModalService;
  public tip: TipService;
  public i18n: I18nService;
  public MenuService: MenuService;
  public httpUtil = httpUtil;

  constructor(private baseInjector: Injector) {
    this.translate = this.baseInjector.get(TranslateService);
    this.http = this.baseInjector.get(HttpClient);
    this.router = this.baseInjector.get(Router);
    this.activatedRoute = this.baseInjector.get(ActivatedRoute);
    this.nzModal = this.baseInjector.get(NzModalService);
    this.tip = this.baseInjector.get(TipService);
    this.i18n = this.baseInjector.get(I18nService);
    this.MenuService = this.baseInjector.get(MenuService);
  }
}
