import { Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuService } from '../../service/system/menu.service';
import { TipService } from '../../service/tip.service';
import { I18nService } from '../../service/system/i18n.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HttpUtilTs } from '../util/http.util';
import { HttpClient } from '@angular/common/http';
import { CodeService } from '../../service/system/code.service';

export class BaseTs {
  public translate: TranslateService;
  public http: HttpClient;
  public router: Router;
  public activatedRoute: ActivatedRoute;
  public nzModal: NzModalService;
  public tip: TipService;
  public i18n: I18nService;
	public code: CodeService;
  public MenuService: MenuService;
  public HttpUtilTs = HttpUtilTs;

  constructor(private baseInjector: Injector) {
    this.translate = this.baseInjector.get(TranslateService);
    this.http = this.baseInjector.get(HttpClient);
    this.router = this.baseInjector.get(Router);
    this.activatedRoute = this.baseInjector.get(ActivatedRoute);
    this.nzModal = this.baseInjector.get(NzModalService);
    this.tip = this.baseInjector.get(TipService);
    this.i18n = this.baseInjector.get(I18nService);
		this.code = this.baseInjector.get(CodeService);
    this.MenuService = this.baseInjector.get(MenuService);
  }

	// 项目数据初始化
	appInit() {
		this.MenuService.initMenu();  // 菜单数据
		// ...其他初始化方法
	}

}
