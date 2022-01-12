import { Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NzModalService } from "ng-zorro-antd/modal";
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { MenuService } from "../../service/system/menu.service";

export class BaseComponent {

	public translate: TranslateService;
  public httpClient: HttpClient;
  public nzModalService: NzModalService
  public nzMessageService: NzMessageService
  public router: Router
  public activatedRoute: ActivatedRoute
	public MenuService:MenuService

  constructor(
		private baseInjector: Injector
	) {
		this.translate = this.baseInjector.get(TranslateService);
    this.httpClient = this.baseInjector.get(HttpClient);
    this.nzModalService = this.baseInjector.get(NzModalService);
    this.nzMessageService = this.baseInjector.get(NzMessageService);
    this.router = this.baseInjector.get(Router);
    this.activatedRoute = this.baseInjector.get(ActivatedRoute);
		this.MenuService = this.baseInjector.get(MenuService);
		// 国际化
    this.translate.use(window.sessionStorage.getItem("lang"));
		this.getI18n()
  }

	// 国际化-数据
	publicI18n: any = {};
	publicI18nBase: any = {};
	publicI18nLoading: boolean = false;
	getI18n() {
		this.httpClient.get('assets/i18n/' + this.translate.currentLang + '.json').subscribe((res: any) => {
			this.publicI18nLoading = false;
      this.publicI18n = res;
			this.publicI18nBase = res.base;
    })
	}
}
