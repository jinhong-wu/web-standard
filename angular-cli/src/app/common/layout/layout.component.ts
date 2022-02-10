import { Component, OnInit, Injector } from '@angular/core';
import { filter } from "rxjs/operators";
import { NavigationEnd } from "@angular/router";
import { BaseComponent } from '../ts/base/base';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent extends BaseComponent implements OnInit {

  constructor(
		public injector: Injector
	) { 
		super(injector);
	}

	// 当前路由
	routerLinkActive: any = this.router.routerState.snapshot.url;
	routerLinkBread: any = [];

	// 侧边栏是否缩小
  isCollapsed: boolean = false;

	// 参考链接
	linkmenus = [
		{ name: "Angular官方文档", href: "https://angular.cn/docs" },
		{ name: "ng-zorro 10.x", href: "https://ng.ant.design/version/10.2.x/components/overview/zh" },
		{ name: "Less官方文档", href: "https://less.bootcss.com/#%E6%A6%82%E8%A7%88" },
		{ name: "ECharts官方文档", href: "https://echarts.apache.org/examples/zh/index.html" },
		{ name: "ECharts社区", href: "https://www.makeapie.com/explore.html#sort=rank~timeframe=all~author=all" },
	];

  ngOnInit() {
		// 初始化侧边栏菜单
		this.MenuService.routerMenuFn(this.routerLinkActive);
		this.MenuService.promise(()=>{
			this.MenuService.menuList.forEach((item) => {
				if (this.router.isActive(item.node.path, false)) {
					this.MenuService.chooseMenu(item.node.path);
				}
			});
			this.routerLinkBreadFn();
		});

		// 路由事件
		this.router.events
			.pipe(filter((event) => event instanceof NavigationEnd))
			.subscribe((res: NavigationEnd) => {
				this.routerLinkActive = res.urlAfterRedirects; // urlAfterRedirects重定向后地址，最好用这个
				this.MenuService.routerMenuFn(this.routerLinkActive);
				this.routerLinkBreadFn();
			});
  }

	// 面包屑
  routerLinkBreadFn() {
    this.routerLinkBread = [];
    let urls = this.routerLinkActive.split("/") || [];
    for (let i = 1, len = urls.length; i < len; i++) {
      let url = urls.slice(0, i + 1).join("/");
      if (this.MenuService.menuObject[url])
        this.routerLinkBread.push(this.MenuService.menuObject[url].node);
    }
  }

}
