import { Component, OnInit, Injector } from '@angular/core';
import { BaseTableComponent } from 'src/app/common/component/base/base-table.component';
import { TableService } from 'src/app/common/api/public/table/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent extends BaseTableComponent implements OnInit {

  constructor(
		public injector: Injector,
		public TableService: TableService
	) {
		super(injector);
	}

  ngOnInit(): void {
  }

}
