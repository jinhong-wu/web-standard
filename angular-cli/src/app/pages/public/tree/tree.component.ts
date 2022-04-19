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
		this.tableParamsFn(advance)
		console.log(this.tableParams);
	}

}
