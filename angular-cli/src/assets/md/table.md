# 注意！！！
- 增删改等操作，都需要刷新table数据

**文件：**
- 全局属性：BaseTs（common/ts/base/base.ts）
- 表格属性&方法：BaseTableTs（common/ts/base/table.base.ts）
- 【组件】表格-上方操作区：app-table-head（common/component/table-head/table-head.component.ts）

**页面效果：**

![image-1](assets/md/imgs/table.png)

# 全部用法
```html
<!-- 表格-上方操作区 封装组件（app-table-head） -->
<app-table-head #tableHead (search)="tableDataFn(true, $event)" (export)="tableExport()" [advanceData]="advanceData"
	[colsData]="colsData">
	<ng-container ngProjectAs="btns">
		<button nz-button nzType="primary">新增</button>
		<button nz-button nzType="primary" [disabled]="!isAllChecked && !isIndeterminate">删除</button>
	</ng-container>
	<ng-container ngProjectAs="tips">
		<nz-alert nzShowIcon nzType="warning" nzMessage="该表格警告语句"></nz-alert>
	</ng-container>
</app-table-head>
<nz-table #Table nzSize="middle" nzLoadingDelay="500" nzFrontPagination="false" nzShowQuickJumper="true"
	nzShowSizeChanger="true" [nzLoading]="tableLoading" [nzData]="tableData" [nzTotal]="tableTotal"
	[(nzPageIndex)]="tablePage" [(nzPageSize)]="tableSize" (nzPageIndexChange)="tableDataFn()"
	(nzPageSizeChange)="tableDataFn(true)" (nzCurrentPageDataChange)="refreshStatus()">
	<!-- 排序功能：(nzSortOrderChange)="sortFn($event, tableDataFn)" -->
	<thead (nzSortOrderChange)="sortFn($event, tableDataFn)">
		<tr>
			<!-- th：勾选框、时间、ip等固定列宽加上对应class -->
			<th class="checkbox" nzShowCheckbox [(nzChecked)]="isAllChecked" [nzIndeterminate]="isIndeterminate"
				(nzCheckedChange)="checkAll($event)"></th>
			<!-- 正常写法 -->
			<!--<th class="time">时间</th>
			<th class="ip">IP</th>
			<th>描述</th>
			<th nzWidth="120px">操作</th>-->
			<!-- 可配置列写法 -->
			<ng-container *ngFor="let item of colsData">
				<!-- 排序功能：[nzShowSort]="item.sort" [nzColumnKey]="item.key" -->
				<th [hidden]="!item.show" [ngClass]="item.class" [style.width]="item.width" [nzShowSort]="item.sort"
					[nzColumnKey]="item.key">
					{{ item.value }}
				</th>
			</ng-container>
		</tr>
	</thead>
	<tbody>
		<tr *ngFor="let item of Table.data">
			<td nzShowCheckbox [(nzChecked)]="checkedIds[item.id]" (nzCheckedChange)="refreshStatus()"></td>
			<td [hidden]="!colsData[0].show">{{item.time}}</td>
			<td [hidden]="!colsData[1].show">{{item.ip}}</td>
			<td [hidden]="!colsData[2].show" [nz-tooltip]="item.describe">{{item.describe}}</td>
			<td [hidden]="!colsData[3].show">
				<a nz-button nzType="link">修改</a>
				<a nz-button nzType="link" [disabled]="true">查看结果</a>
			</td>
		</tr>
	</tbody>
</nz-table>
```
```typescript
import { Component, OnInit, Injector } from '@angular/core';
import { BaseTableTs } from 'src/app/common/ts/base/table.base';
import { TableService } from 'src/app/common/api/public/table/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
// extends BaseTableTs必须
export class TableComponent extends BaseTableTs implements OnInit {

	constructor(
		public injector: Injector,
		public TableService: TableService
	) {
		super(injector);
	}

	// 举例：精确查询
	advanceData = [
		{ 
			key: "strategyName", 
			type: "text", 
			style: { class: 'width1' },
			placeholder: "策略名称", 
		},
		{ 
			key: "strategyStatus", 
			type: "select",
			placeholder: "策略状态", 
			options: [
				{ value: 'PROCESSING', label: '进行中' },
				{ value: 'SUCCESS', label: '下发成功' },
				{ value: 'FAILED', label: '下发失败' },
				{ value: 'CANCELED', label: '已取消' },
			]
		},
	];

	colsData = [
    {
      key: "time",
      value: "时间",
			class: "time",
      show: true,
			sort: true
    },
		{
      key: "ip",
      value: "IP",
			class: "ip",
      show: true,
    },
		{
      key: "describe",
      value: "描述",
      show: true,
    },
		{
      key: "handle",
      value: "操作",
			width: "120px",
      show: true,
    },
  ];

  ngOnInit(): void {
		this.tableDataFn();
  }

	// 获取表格数据
	tableDataFn(reset: boolean = false, advance: boolean = false) {
    this.tableInit(reset, advance);
		//this.TableService.tableData(this.tableParams).subscribe((res) => {
		//	this.tableLoading = false;
		//	this.tableTotal = res.total;
		//	this.tableData = res.data;
		//});
	}

	tableExport() {
		this.tip.confirm("确定导出xxx数据？", ()=>{
			//this.TableService.tableExport(queryParam);
		});
	}
}
```
# 上方操作区（app-table-head）
**使用-参数：**
- search：获取表格数据方法（keywordShow = true时必传，false时可不传）
- keywordShow：右侧查询区-输入框，默认true显示
- advanceData：精确查询数据，参考interface advanceData
- colsData 可配置列数据，参考interface colsData
- exportShow：精确查询-导出，默认true显示
- export：精确查询-导出方法（exportShow = true时必传，false时可不传）
```html
<!-- #tableHead 必须取此名 -->
<!-- tableDataFn(true, $event)  // 参数：是否刷新页数, 是否为精确查询 -->
<app-table-head #tableHead (search)="tableDataFn(true, $event)" (export)="tableExport()" [advanceData]="advanceData"
	[colsData]="colsData">
	<ng-container ngProjectAs="btns">
		<button nz-button nzType="primary">新增</button>
		<button nz-button nzType="primary" [disabled]="!isAllChecked && !isIndeterminate">删除</button>
	</ng-container>
	<ng-container ngProjectAs="tips">
		<nz-alert nzShowIcon nzType="warning" nzMessage="该表格警告语句"></nz-alert>
	</ng-container>
</app-table-head>
```
```typescript
interface advanceData {
	key: string;  // 对应param参数
	type: string;  // 输入框类型（文字输入框text、下拉框select）
	value?: string | number; // ngModel输入值
	options?: advanceDataOptions[]  // type:'select'时，必传
	placeholder?: string  // placeholder提示文字
	style?: {  // .item样式
		// .item盒子新增class，更多class查看common.less .table-head
		//（输入框宽度.width2 >.width-short，为了美观，width2数据建议放在最后）
		class?: string
	}	
}
interface advanceDataOptions {
	label: string;
	value: string;
}
interface colsData {
	key: string,  // 对应列key
	value: string,  // 对应列名称
	show: boolean,  // 对应列是否展示
	class?: string,  // 对应列class
	width?: string  // 对应列class
}
```

# 勾选框
- 多个勾选框
```html
<thead>
	<tr>
		<th class="checkbox" nzShowCheckbox [(nzChecked)]="isAllChecked" [nzIndeterminate]="isIndeterminate"
			(nzCheckedChange)="checkAll($event)">
		</th>
	</tr>
</thead>
<tbody>
	<tr *ngFor="let item of Table.data">
		<td nzShowCheckbox [(nzChecked)]="checkedIds[item.id]" (nzCheckedChange)="refreshStatus()"></td>
	</tr>
</tbody>
```
- 单个勾选框
```html
<thead>
	<tr></tr>
</thead>
<tbody>
	<tr *ngFor="let item of Table.data">
		<td nzShowCheckbox [(nzChecked)]="checkedIds[item.id]" (nzCheckedChange)="checkRadio(item.id, $event)"></td>
	</tr>
</tbody>
```


