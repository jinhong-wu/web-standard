# 必读！！！
- 新增/修改：用同一个文件即可，命名 xxx-create  
  组件传值 [tab]="tab"，修改数据包含在tab.data
- 修改：函数命名统一为update()
- 概览：命名 xxx-overview

**文件：**
- 一级导航、侧边栏：app-layout（common/layout/layout.component.ts）
- 【服务】菜单-属性方法：MenuService（common/service/system/menu.service.ts）

# 全部用法
- 一级导航切换时，修改侧边二级导航（app-layout）
- 监听路由变更事件：获取当前路由数据、面包屑功能（app-layout）
- n级导航（nz-tabset）：createTab、closeTab等统一方法（MenuService）
  tabs为后端返回的child数据生成，不能前端写死（一般为四级导航（五级导航获取方法视情况而定））
- 概览：点击到概览页面，都需要重新刷新数据

```html
<nz-tabset [(nzSelectedIndex)]="MenuService.selectIndex" (nzSelectedIndexChange)="MenuService.selectTab(overview)">
	<nz-tab *ngFor="let tab of MenuService.tabs" [nzTitle]="titleTemplate">
		<ng-template #titleTemplate>
			<div>
				{{ tab.name}}
				<i nz-icon nzType="close" class="ant-tabs-close-x" *ngIf="tab.closeable"
					(click)="MenuService.closeTab(tab)"></i>
			</div>
		</ng-template>
		<!-- 概览 -->
		<ng-container *ngIf="tab.id == 'public-menu-overview'">
			<app-menu-overview #overview></app-menu-overview>
		</ng-container>
		<!-- 列表 -->
		<ng-container *ngIf="tab.id == 'public-menu-list'">
			<app-menu-list #list [tab]="tab"></app-menu-list>
		</ng-container>
		<!-- 列表-新增、修改 -->
		<ng-container *ngIf="tab.id.includes('public-menu-list-')">
			<!-- tab：对应tab值，必传；search：对应表格查询函数，必传  -->
			<app-menu-create [tab]="tab" (search)="tableDataFn($event)"></app-menu-create>
		</ng-container>
	</nz-tab>
</nz-tabset>
```  

```typescript
import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { TableBaseTs } from 'src/app/common/ts/base/table.base';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
})
export class MenuComponent extends TableBaseTs implements OnInit {
  constructor(public injuctor: Injector) {
    super(injuctor);
  }

  // Tab（备注tab对应id，方便代码查看）
	// 概览 public-menu-overview
  // 列表 public-menu-list

	@ViewChild('overview', { static: false }) overview;
  @ViewChild('list', { static: false }) list;

  ngOnInit() {
    this.MenuService.initTab(); // 菜单页面必须调用此方法，生成菜单数据
  }

  // 刷新表格数据
  tableDataFn(reset) {
    this.list.tableDataFn(reset);
  }
}
```

# 概览
示例文件：MenuOverviewComponent（pages/public/menu/menu-overview/menu-overview.component.ts）
```typescript
// 必须使用getOverview()方法请求数据，以便MenuService.selectTab统一调用
getOverview() {
  this.tip.msg('warning', '点击到概览页面，调用getOverview()方法刷新数据');
}
```