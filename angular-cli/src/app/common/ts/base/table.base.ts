import { Injector, ViewChild } from '@angular/core';
import { BaseTs } from './base';

export class BaseTableTs extends BaseTs {
  constructor(public injector: Injector) {
    super(injector);
  }

  @ViewChild('tableHead', { static: false }) tableHead: any = {};

  tableData: any = [];
  tableLoading: boolean = false;
  tableTotal: number = 0;
  tablePage: number = 1;
  tableSize: number = 10;
  tableParams: any = {};

  // 排序
  orderBy: string = '';

  // 选择功能：nz-checkbox
  checkedIds: { [key: string]: boolean } = {};
  isAllChecked: Boolean = false;
  isIndeterminate: Boolean = false;

  // 精确查询
  advanceData: any = [];

  // 状态初始化
  tableInit(reset, advance) {
    if (reset) {
      this.tablePage = 1;
      this.checkedIds = {};
      this.isAllChecked = false;
      this.isIndeterminate = false;
    }
    this.tableParamsFn(advance);
    this.tableLoading = true;
  }

  // 请求参数
  tableParamsFn(advance) {
    this.tableParams = {
      page: this.tablePage - 1,
      size: this.tableSize,
    };
    if (this.orderBy) {
      this.tableParams.orderBy = this.orderBy;
    }
    if (advance) {
      // 精确查询传参
      this.advanceData.forEach((d) => {
        this.tableParams[d.key] = d.value;
      });
    } else {
      this.tableParams.keyword = this.tableHead.keyword;
    }
  }

  // 排序
  sortFn(sort, fn: Function) {
    this.orderBy = sort.key + ' ' + sort.value;
    fn.call(this);
  }

  // 刷新勾选状态
  refreshStatus() {
    if (this.tableData.length > 0) {
      this.isAllChecked = this.tableData.every(
        (item) => this.checkedIds[item.id]
      );
      this.isIndeterminate =
        this.tableData.some((item) => this.checkedIds[item.id]) &&
        !this.isAllChecked;
    } else {
      this.checkedIds = {};
      this.isAllChecked = false;
      this.isIndeterminate = false;
    }
  }

  // 勾选框-单选
  checkRadio(id, value) {
    this.checkedIds = {
      [id]: value,
    };
  }

  // 全选、取消全选
  checkAll(value) {
    this.tableData.forEach((item) => (this.checkedIds[item.id] = value));
    this.refreshStatus();
  }

  // 获取选中行id（getData是否返回整行数据）
  getCheckedIds(getData: boolean = false) {
    let checkedIds = [],
      checkedDatas = [];
    for (let id in this.checkedIds) {
      if (this.checkedIds[id]) {
        checkedIds.push(id);
        if (getData) {
          checkedDatas.push(this.tableData.find((item) => item.id === id));
        }
      }
    }
    return { checkedIds, checkedDatas };
  }

  // 操作功能：新增
  tab: any = {};
  create(tab: any = {}) {
    if (tab.id) this.tab = tab;
    this.MenuService.createTab({
      type: 'create',
      pid: this.tab.id,
      name: this.i18n.baseList.create + this.tab?.name,
    });
  }
  // 操作功能：修改
  update(item, tab: any = {}) {
    if (tab.id) this.tab = tab;
    this.MenuService.createTab({
      type: 'update',
      pid: this.tab.id,
      name: this.i18n.baseList.update + '：' + (item.name || ''),
      data: item,
    });
  }
}
