import { Component, OnInit, Injector } from '@angular/core';
import { filter } from 'rxjs/operators';
import { NavigationEnd } from '@angular/router';
import { BaseTs } from '../ts/base';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
})
export class LayoutComponent extends BaseTs implements OnInit {
  constructor(public injector: Injector) {
    super(injector);
  }

  // 当前路由
  routerLinkActive: any = this.router.routerState.snapshot.url;
  routerLinkBread: any = [];

  // 侧边栏是否缩小
  isCollapsed: boolean = false;

	// 在线文档
	linkFiles = [
    { name: '问题总结', href: 'https://venusgroup.feishu.cn/sheets/shtcnYN9aMGvgx6oMgW9FkGhq2d' },
		{
      name: '代码规范记录',
      href: 'https://venusgroup.feishu.cn/sheets/shtcns5AoJrd2VcSSmO74AukJzh?sheet=d2zYrT',
    },
		{
      name: '产品各类输入项检查',
      href: 'https://venusgroup.feishu.cn/sheets/shtcnnQEAE93X3LJVymN4e5rrnb',
    },
		
  ];
  // 参考链接
  linkMenus = [
    { name: 'Angular官方文档', href: 'https://angular.cn/docs' },
    {
      name: 'ng-zorro 10.x',
      href: 'https://ng.ant.design/version/10.2.x/components/overview/zh',
    },
    {
      name: 'Less官方文档',
      href: 'https://less.bootcss.com/#%E6%A6%82%E8%A7%88',
    },
    {
      name: 'ECharts官方文档',
      href: 'https://echarts.apache.org/examples/zh/index.html',
    },
    //{
    //  name: 'PDF官方文档',
    //  href: 'https://github.com/VadimDez/ng2-pdf-viewer',
    //},
  ];

  async ngOnInit() {
    // 初始化侧边栏菜单
		await this.MenuService.promise()
    this.MenuService.routerMenuFn(this.routerLinkActive);
		this.MenuService.menuList.forEach((item) => {
			if (this.router.isActive(item.node.path, false)) {
				this.MenuService.chooseMenu(item.node.path);
			}
		});
		this.routerLinkBreadFn();
    // 路由事件
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((res: NavigationEnd) => {
        // 路由传参数时：routerLinkActive侧边栏高亮需要去掉参数
        this.routerLinkActive = res.urlAfterRedirects.split("?")[0];
        this.MenuService.routerMenuFn(this.routerLinkActive);
        this.routerLinkBreadFn();
      });
  }

  // 面包屑
  routerLinkBreadFn() {
    this.routerLinkBread = [];
    let urls = this.routerLinkActive.split('/') || [];
    for (let i = 1, len = urls.length; i < len; i++) {
      let url = urls.slice(0, i + 1).join('/');
      if (this.MenuService.menuObject[url])
        this.routerLinkBread.push(this.MenuService.menuObject[url].node);
    }
  }
}
