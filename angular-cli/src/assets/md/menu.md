# 注意！！！
- 新增/修改：用同一个文件即可，命名 xxx-create  
  组件传值 [tab]="tab" [tabIndex]="index"，修改数据包含在tab.data
- 修改：函数命名统一为update()

**文件：**
- 一级导航、侧边栏：app-layout（common/layout/layout.component.ts）
- 【服务】菜单-属性方法：MenuService（common/service/system/menu.service.ts）

# 全部用法
- 一级导航切换时，修改侧边二级导航（app-layout）
- 监听路由变更事件：获取当前路由数据、面包屑功能（app-layout）
- n级导航（nz-tabset）：createTab、closeTab等统一方法（MenuService）
  tabs为后端返回的child数据生成，不能前端写死（一般为四级导航（五级导航获取方法视情况而定））

```html
<nz-tabset [(nzSelectedIndex)]="MenuService.selectIndex" (nzSelectedIndexChange)="MenuService.selectTab($event)">
	<nz-tab *ngFor="let tab of MenuService.tabs;let index=index" [nzTitle]="titleTemplate">
		<ng-template #titleTemplate>
			<div>
				{{ tab.name}}
				<i nz-icon nzType="close" class="ant-tabs-close-x" *ngIf="tab.closeable"
					(click)="MenuService.closeTab(index)"></i>
			</div>
		</ng-template>
		<!-- 表单列表 -->
		<ng-container *ngIf="tab.id == 'public-menu-list'">
			<app-menu-list #menuList [tab]="tab"></app-menu-list>
		</ng-container>
		<!-- 表单列表-新增、修改 -->
		<ng-container *ngIf="tab.id.includes('public-menu-list-')">
			<!-- tab：对应tab值，tabIndex：对应tab序号，必传，search：对应表格查询函数，必传  -->
			<app-menu-create [tab]="tab" [tabIndex]="index" (search)="tableDataFn($event)"></app-menu-create>
		</ng-container>

	</nz-tab>
</nz-tabset>
```  

```typescript
import { Component, OnInit, Injector } from '@angular/core';
import { TableBaseTs } from 'src/app/common/ts/base/table.base';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent extends TableBaseTs implements OnInit {

  constructor(
		public injuctor: Injector,
	) { 
		super(injuctor);
	}

	// Tab
	// 表单列表 public-menu-list

	item = {
		id: "1",
		name: '用户信息1',
		username: 'admin',
		address: '启明星辰',
		describe: '描述'
	}
  ngOnInit() {
		// 菜单页面必须调用此方法，生成菜单数据
		this.MenuService.initTab();
  }

	tableDataFn(reset) {
		console.log('tableDataFn()：'+reset);
	}

}

```