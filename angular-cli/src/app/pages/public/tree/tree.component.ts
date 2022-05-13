import { Component, Injector, OnInit } from '@angular/core';
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
	
	treeParamKey = 'treeKey';

  ngOnInit(): void {}

	// 获取表格数据
	tableDataFn(reset: boolean = false, advance: boolean = false, params?: Function) {
		this.tableParamsFn(advance)
		console.log(this.tableParams);
	}

}
