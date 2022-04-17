# 代码规范
- 必须多写注释！！！！！（特别是国际化代码）  
- 代码顺序保持下列示例  
  ```typescript
	import { Component, OnInit, Injector } from '@angular/core';
	import { TableBaseTs } from 'src/app/common/ts/base/table.base';

	@Component({
		selector: 'app-table',
		templateUrl: './table.component.html',
		styleUrls: ['./table.component.less']
	})

	export class TableComponent extends TableBaseTs implements OnInit {
		// 1、constructor构造函数
		constructor(
			public injector: Injector,
		) {
			super(injector);
		}

		// 2、接收传输值/函数：@Input()、@Output()、@ViewChild...

		// 3、各种属性值

		// 4、生命周期函数：ngOnInit、ngAfterViewInit、ngOnDestroy...

		// 5、各种函数
	```

# 命名规范
## 文件名
- 概览：xxx-overview
- 列表：xxx-list
- 新增/修改：用同一个文件即可，命名 xxx-create  
  组件传值 [tab]="tab" [tabIndex]="index"，修改数据包含在tab.data（参考 公共示例-Menu菜单）

## 函数名
- 概览页面初始化函数名必须：getOverview()   
	// 在MenuService.selectTab()中，点击到概览页面，都需要重新刷新数据
- 修改：update()