# 必读！！！
- 增删改等操作，都需要刷新table数据
- 增/改：请求第一页、删：请求最近有数据的一页
- th：勾选框、时间、ip等固定列宽，必须写入宽度样式（.checkbox .time .ip）
- td：较长td必须 [nz-tooltip]="xxx"
```html
<td [nz-tooltip]="item.name">{{item.name}}</td>
```
- 【修改】操作，写在操作列
```html
<thead>
	<!-- 操作列：必须写入nzWidth -->
	<th nzWidth="120px">操作</th>
</thead>
<tbody>
	<td>
		<!-- 按钮使用：<a nz-button nzType="link"></a> -->
		<a nz-button nzType="link"  *ngIf="MenuService.routerMenuPoint.includes('update')" (click)="update(item, 'name', tab)">
			修改
		</a>
		<a nz-button nzType="link" [disabled]="true">其他操作</a>
	</td>
</tbody>
```
- 模糊/精确查询框提示语句：文案及提示顺序与表头字段保持一致
- 单独的空格、前后的空格当作无效数据查询所有，两个字符中间的空格当作有效数据处理（BUG编号24724）
- 表格：[nzLoading]="tableLoading"（必须）
```html
<nz-table [nzLoading]="tableLoading">
</nz-table>
```

**文件：**
- 全局属性：BaseTs（common/ts/base/base.ts）
- 表格属性&方法：TableBaseTs（common/ts/base/table.base.ts）
- 【组件】表格-上方操作区：app-table-head（common/component/table-head/table-head.component.ts）

**页面效果：**

![image-1](assets/md/imgs/table.png)

# 上方操作区（app-table-head）
**使用-参数：**
- search：获取表格数据方法（fuzzyShow = true时必传，false时可不传）
- fuzzyShow：右侧查询区-输入框，默认true显示
- placeholder: 右侧查询区-输入框placeholder
- advanceData：精确查询数据，参考interface advanceData
- colsData：可配置列数据，参考interface colsData
- exportShow：精确查询-导出，默认false隐藏
- export：精确查询-导出方法（exportShow = true时必传，false时可不传）
	```html
	<!-- #tableHead 必须取此名 -->
	<!-- tableDataFn(true, $event)  // 参数：是否刷新页数, 是否为精确查询 -->
	<app-table-head #tableHead (search)="tableDataFn(true, $event)" [exportShow]="'true'" (export)="export()" [advanceData]="advanceData" [colsData]="colsData">
		<ng-container ngProjectAs="btns">
		</ng-container>
		<ng-container ngProjectAs="tips">
		</ng-container>
	</app-table-head>
	```

# 全部用法
- 支持跨页勾选
- 勾选框-单选、多选
	```html
	<thead>
		<tr>
			<!-- 单选 -->
			<th class="checkbox"></th>
			<!-- 多选 -->
			<th class="checkbox" nzShowCheckbox [(nzChecked)]="isAllChecked" [nzIndeterminate]="isIndeterminate"
				(nzCheckedChange)="checkAll($event)">
			</th>
		</tr>
	</thead>
	<tbody>
		<tr *ngFor="let item of Table.data">
			<!-- 单选 -->
			<td nzShowCheckbox [(nzChecked)]="checkedRows[item.id]" (nzCheckedChange)="checkbox(item, false)"></td>
			<!-- 多选 -->
			<td nzShowCheckbox [(nzChecked)]="checkedRows[item.id]" (nzCheckedChange)="checkbox(item)"></td>
		</tr>
	</tbody>
	```

```html
<!-- 表格-上方操作区 封装组件（app-table-head） -->
<app-table-head #tableHead (search)="tableDataFn(true, $event)" [exportShow]="'true'" (export)="export()"
	[advanceData]="advanceData" [colsData]="colsData">
	<ng-container ngProjectAs="btns">
		<!-- MenuService.routerMenuPoint.includes('create') 权限校验 -->
		<button nz-button nzType="primary" *ngIf="MenuService.routerMenuPoint.includes('create')"
			(click)="create('', tab)">新增</button>
		<button nz-button nzType="primary" *ngIf="MenuService.routerMenuPoint.includes('delete')" (click)="deleteFn()"
			[disabled]="!isAllChecked && !isIndeterminate">删除</button>
		<button nz-button nzType="primary" *ngIf="MenuService.routerMenuPoint.includes('import')"
			(click)="importFn()">导入</button>
		<button nz-button nzType="primary" *ngIf="MenuService.routerMenuPoint.includes('export')"
			(click)="export('checked')" [disabled]="!isAllChecked && !isIndeterminate">导出</button>
	</ng-container>
	<ng-container ngProjectAs="tips">
		<nz-alert nzShowIcon nzType="warning" nzMessage="表格提示：统一放在按钮下，表格上。"></nz-alert>
	</ng-container>
</app-table-head>
<!-- 此处为前端假数据所以忽略nzFrontPagination="false" -->
<nz-table #Table nzSize="middle" nzTableLayout="fixed" nzLoadingDelay="500" nzShowQuickJumper="true" nzShowSizeChanger="true"
	[nzLoading]="tableLoading" [nzData]="tableData" [nzTotal]="tableTotal" [(nzPageIndex)]="tablePage"
	[(nzPageSize)]="tableSize" (nzPageIndexChange)="tableDataFn()" (nzPageSizeChange)="tableDataFn(true)"
	(nzCurrentPageDataChange)="refreshStatus()">
	<!-- 排序功能：(nzSortOrderChange)="sortFn($event, tableDataFn)" -->
	<thead (nzSortOrderChange)="sortFn($event, tableDataFn)">
		<tr>
			<!-- th：子表格、勾选框、时间、ip等固定列宽加上对应class -->
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
					{{ item.title }}
				</th>
			</ng-container>
			<th nzWidth="60px">{{ i18n.baseList.handle }}</th>
		</tr>
	</thead>
	<tbody>
		<tr *ngFor="let item of Table.data">
			<td nzShowCheckbox [(nzChecked)]="checkedRows[item.id]" (nzCheckedChange)="checkbox(item)"></td>
			<td [hidden]="!colsData[0].show">{{item.time}}</td>
			<td [hidden]="!colsData[1].show">{{item.ip}}</td>
			<td [hidden]="!colsData[2].show">
				<nz-select nzShowSearch nzAllowClear nzDropdownMatchSelectWidth style="width: 100%;"
					nzPlaceHolder='很长的placeHolder很长的placeHolder很长的placeHolder'>
					<nz-option nzValue="true" nzLabel="select/select-tree必须配置nzDropdownMatchSelectWidth：默认最小宽度为选择器宽度，超出后自适应宽度">
					</nz-option>
				</nz-select>
			</td>
			<td [hidden]="!colsData[3].show" [nz-tooltip]="item.describe">{{item.describe}}</td>
			<td>
				<a nz-button nzType="link"  *ngIf="MenuService.routerMenuPoint.includes('update')" (click)="update(item, 'name', tab)">
					修改
				</a>
			</td>
		</tr>
	</tbody>
</nz-table>
```
```typescript
import { Component, OnInit, Injector } from '@angular/core';
import { TableBaseTs } from 'src/app/common/ts/base/table.base';
import { TableService } from 'src/app/common/api/public/table/table.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.less'],
})
export class MenuListComponent extends TableBaseTs implements OnInit {
  constructor(public injector: Injector, public TableService: TableService) {
    super(injector);
  }

  // 举例
  advanceData = [
    {
      key: 'key-text',
      type: 'text',
      style: { class: 'width1' },
      placeholder: '文字框',
    },
    {
      key: 'key-select',
      type: 'select',
      placeholder: '下拉框',
      options: [
        { value: '1', label: 'option1' },
        { value: '2', label: 'option2' },
        { value: '3', label: 'option3' },
        { value: '4', label: 'option4' },
      ],
    },
    {
      key: 'key-tree',
      type: 'tree',
      placeholder: '下拉框-树',
      nodes: [
        {
          title: 'parent 1',
          key: '100',
          children: [
            {
              title: 'parent 1-0',
              key: '1001',
              children: [{ title: 'leaf 1-0-0', key: '10010', isLeaf: true }],
            },
          ],
        },
      ],
    },
		...this.advanceDataDate
  ];

  colsData = [
    {
      title: '时间',
      key: 'time',
      class: 'time',
      show: true,
      sort: true,
    },
    {
      title: 'IP',
      key: 'ip',
      class: 'ip',
      show: true,
    },
		{
      title: '下拉框样式',
      key: 'select',
			width: '100px',
      show: true,
    },
    {
      title: '描述',
      key: 'describe',
      show: true,
    }
  ];

  exportUrl = 'https://....';

  ngOnInit(): void {
    this.tableDataFn();
  }
	
  // 获取表格数据
  tableDataFn(reset: boolean = false, advance: boolean = false) {
			//this.tableInit({
			//	reset,
			//	advance,
			//	tableService: this.TableService,
			//	tableData: 'tableData',
			//	successFn(data){
	
			//	},
			//	errorFn() {
					setTimeout(() => {
						this.tableTotal = 5;
						this.tableSize = 3;
						this.tableLoading = false;
						this.tableData = new Array(this.tableTotal).fill(0).map((_, index) => {
							return {
								id: index,
								init: 'init',
								name: 'name' + index,
								time: '2022-01-01 12:00:00',
								ip: '255.255.255.255',
								describe: `超长描述超长描述超长描述超长描述超长描述超长描述超长描述超长描述超长描述超长描述超长描述超长描述超长描述`,
							};
						});
					}, 1000);
			//}
			//});
  }

	importFn() {
		this.import({
			importUrl: '',
      tempUrl: 'aa',
      resFn() {
				console.log('右上角关闭弹出框后操作');
      }
		})
  }

  deleteFn() {
    this.delete('', {
      columns: [
        {
          title: '名称',
          key: 'name',
        },
        {
          title: 'IP',
          key: 'ip',
        },
      ],
      doFn() {
        console.log('删除函数');
      },
      resFn() {
        console.log('执行完成后的回调函数');
      },
    });
  }
}

```