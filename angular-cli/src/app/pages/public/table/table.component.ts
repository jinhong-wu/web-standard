import { Component, OnInit, Injector } from '@angular/core';
import { TableBaseTs } from 'src/app/common/ts/base/table.base';
import { TableService } from 'src/app/common/api/public/table/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
})
// extends TableBaseTs必须
export class TableComponent extends TableBaseTs implements OnInit {
  constructor(public injector: Injector, public TableService: TableService) {
    super(injector);
  }

  ngOnInit() {}
}

//this.tableTotal = 10;
//this.tableLoading = false;
//this.tableData = new Array(this.tableTotal).fill(0).map((_, index) => {
//	return {
//		id: index,
//		time: '2022-01-01 12:00:00',
//		ip: '255.255.255.255',
//		describe: `超长描述超长描述超长描述超长描述超长描述超长描述超长描述超长描述超长描述超长描述超长描述超长描述超长描述`,
//	};
//});
