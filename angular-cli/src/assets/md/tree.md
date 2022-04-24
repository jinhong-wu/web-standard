# 必读！！！
- nz-tree-select必须配置nzShowSearch、nzAllowClear、nzHideUnMatched、nzDropdownMatchSelectWidth（除非特殊要求）
  ```html
	<!-- 
		nzShowSearch：可搜索
		nzAllowClear：显示清除按钮
		nzHideUnMatched：搜索过滤
		nzDropdownMatchSelectWidth：默认最小宽度为选择器宽度，超出后自适应宽度。  
	-->
	<nz-tree-select nzShowSearch nzAllowClear nzHideUnMatched nzDropdownMatchSelectWidth [nzNodes]="nodes" nzPlaceHolder="">
	</nz-tree-select>
	```

**文件：**
- 全局属性：TreeTableBaseTs（common/ts/base/tree-table.base.ts）
- 【组件】左树右表格：app-tree-table（common/component/tree-table/tree-table.component.ts）

**页面效果：**

![image-1](assets/md/imgs/tree-table.png)

# 左树右表格（app-tree-table）
**实现功能：**
- 默认展开根节点
- 树的查询条件不管模糊查询还是精确查询必须带上
- disabled不能限制右键nzContextMenu方法，在nzContextMenu方法中手动判断
- 可拖动调整宽度
- 搜索高亮 过滤（10.x已实现）
- 点击要明确表现出被点击的状态（10.x已实现，自定义nzTreeTemplate也实现）
**使用-参数：**
- searchShow：是否显示查询输入框，默认true显示
- searchValue：查询值（searchShow = true时必传，false时可不传）
- width：树宽度，默认300px
- resizable：是否可拖动，默认true（200px<width<50%）
  ```html
	<app-tree-table [(searchValue)]="treeSearch">
		<ng-container ngProjectAs="tree">
			<!-- nz-tree -->
		</ng-container>
		<ng-container ngProjectAs="table">
			<!-- nz-table -->
		</ng-container>
	</app-tree-table>
	```

# 全部用法
```html
<app-tree-table [(searchValue)]="treeSearch">
	<ng-container ngProjectAs="tree">
		<nz-tree #leftTree nzHideUnMatched [nzData]="treeNodes" [nzSearchValue]="treeSearch"
			(nzSearchValueChange)="searchChange()" (nzClick)="clickNodeFn($event, tableDataFn)"
			(nzContextMenu)="contextMenu($event, treeMenu)" [nzTreeTemplate]="treeTemp">
		</nz-tree>
		<ng-template #treeTemp let-node>
			<span [title]="node.title">
				<span [innerHTML]="searchLight(node.title)"></span>
				（其他内容...）
			</span>
		</ng-template>
		<nz-dropdown-menu #treeMenu>
			<ul nz-menu>
				<li nz-menu-item>新增</li>
				<li nz-menu-item>修改</li>
				<li nz-menu-item>删除</li>
			</ul>
		</nz-dropdown-menu>
	</ng-container>
	<ng-container ngProjectAs="table">
		<app-menu-list></app-menu-list>
	</ng-container>
</app-tree-table>
```
```typescript
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { TreeTableBaseTs } from 'src/app/common/ts/base/tree-table.base';
import { TableService } from 'src/app/common/api/public/table/table.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.less'],
})
export class TreeComponent extends TreeTableBaseTs implements OnInit {
  constructor(
		public injuctor: Injector,
		public TableService: TableService
	) {
    super(injuctor);
  }
	@ViewChild('leftTree', { static: false }) tree: any;
	treeParamKey = 'treeKey';

  ngOnInit(): void {
		this.http.get<any>('assets/json/tree.json').subscribe((data) => {
			let tem = [];;
      data.forEach((t) => {
				tem.push({
					title: t.name,
					key: t.id,
					children: [],
					id: t.id,
					pid: t.pid,
					expanded: t.id == "1",
					//disabled: true
				});
			});
			this.treeNodes = this.treeNodesFn(tem);
    });
	}

	// 获取表格数据
	tableDataFn(reset: boolean = false, advance: boolean = false, params?: Function) {
		this.tableInit({
			reset,
			advance,
			tableService: this.TableService,
			tableData: 'tableData',
			successFn(data){
			}
		});
		console.log(this.tableParams);
	}

}
```