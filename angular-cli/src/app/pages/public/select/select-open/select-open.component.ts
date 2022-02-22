import { Component, OnInit, Injector } from '@angular/core';
import { TableBaseTs } from 'src/app/common/ts/base/table.base';
import { TableService } from 'src/app/common/api/public/table/table.service';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-select-open',
  templateUrl: './select-open.component.html',
  styleUrls: ['./select-open.component.less'],
})
export class SelectOpenComponent extends TableBaseTs implements OnInit {
  constructor(
    public injector: Injector,
    public TableService: TableService,
    public NzModalRef: NzModalRef
  ) {
    super(injector);
  }

  // 举例：精确查询
  advanceData = [
    {
      key: 'strategyName',
      type: 'text',
      style: { class: 'width1' },
      placeholder: '策略名称',
    },
    {
      key: 'strategyStatus',
      type: 'select',
      placeholder: '策略状态',
      options: [
        { value: 'PROCESSING', label: '进行中' },
        { value: 'SUCCESS', label: '下发成功' },
        { value: 'FAILED', label: '下发失败' },
        { value: 'CANCELED', label: '已取消' },
      ],
    },
  ];

  colsData = [
    {
      key: 'time',
      value: '时间',
      class: 'time',
      show: true,
      sort: true,
    },
    {
      key: 'ip',
      value: 'IP',
      class: 'ip',
      show: true,
    },
    {
      key: 'describe',
      value: '描述',
      show: true,
    },
    {
      key: 'handle',
      value: '操作',
      width: '120px',
      show: true,
    },
  ];

  ngOnInit(): void {
    this.tableDataFn();
  }

  // 获取表格数据
  tableDataFn(reset: boolean = false, advance: boolean = false) {
    this.tableTotal = 10;
    this.tableLoading = false;
    this.tableData = new Array(10).fill(0).map((_, index) => {
      return {
        id: '' + index,
        name: 'name' + index,
        time: '2022-01-01 12:00:00',
        ip: '255.255.255.255',
        describe: `超长描述超长描述超长描述超长描述超长描述超长描述超长描述超长描述超长描述超长描述超长描述超长描述超长描述`,
      };
    });
  }

  save() {
    this.checkedIdsFn(true);
    this.NzModalRef.close({
      value: this.checkedIds,
      option: this.checkedData,
    });
  }
}
