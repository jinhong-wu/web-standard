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
    {
      key: 'startDt',
      type: 'date',
      placeholder: '开始时间',
    },
    {
      key: 'endDt',
      type: 'date',
      placeholder: '结束时间',
    },
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
      title: '描述',
      key: 'describe',
      show: true,
    },
    {
      title: '操作',
      key: 'handle',
      width: '60px',
      show: true,
    },
  ];

  ngOnInit(): void {
    this.tableDataFn();
  }

  // 获取表格数据
  tableDataFn(reset: boolean = false, advance: boolean = false) {
    this.tableInit(reset, advance);
    setTimeout(() => {
      this.tableTotal = 3;
      this.tableLoading = false;
      this.tableData = new Array(this.tableTotal).fill(0).map((_, index) => {
        return {
          id: index,
          name: 'name' + index,
          time: '2022-01-01 12:00:00',
          ip: '255.255.255.255',
          describe: `超长描述超长描述超长描述超长描述超长描述超长描述超长描述超长描述超长描述超长描述超长描述超长描述超长描述`,
        };
      });
    }, 1000);
  }

  tableExport() {
    this.tip.confirm('确定导出xxx数据？', () => {
      //this.TableService.tableExport(queryParam);
    });
  }

  delete() {
    this.deleteInit('确定删除所选xxx数据？', {
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
