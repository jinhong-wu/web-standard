import { Injector, Input, ViewChild } from '@angular/core';
import { BaseTs } from './base';
import { TipModalService } from 'src/app/common/service/tip-modal.service';

export class TableBaseTs extends BaseTs {
  public tipModal;
  constructor(public injector: Injector) {
    super(injector);
    this.tipModal = injector.get(TipModalService);
  }

  @ViewChild('tableHead', { static: false }) tableHead: any = {};
  @Input() tab: any = {};

  tableData: any = [];
  tableLoading: boolean = false;
  tableTotal: number = 0;
  tablePage: number = 1;
  tableSize: number = 10;
  tableParams: any = {};

  // 排序
  orderBy: string = '';
  // 勾选框-是否为多选
  multiple: boolean = true;

  // 选择功能：nz-checkbox
  checkedRows: { [key: string]: boolean } = {};
  checkedIds: any = [];
  checkedData: any = [];
  isAllChecked: Boolean = false;
  isIndeterminate: Boolean = false;

  // 精确查询
  advanceData: any = [];

  // 状态初始化
  tableInit(reset = false, advance) {
    if (reset) {
      this.tablePage = 1;
      this.checkedRows = {};
      this.isAllChecked = false;
      this.isIndeterminate = false;
    }
    this.tableParamsFn(advance);
    this.tableLoading = true;
  }

  // 请求参数
  tableParamsFn(advance = false) {
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
        (item) => this.checkedRows[item.id]
      );
      this.isIndeterminate =
        this.tableData.some((item) => this.checkedRows[item.id]) &&
        !this.isAllChecked;
    } else {
      this.checkedRows = {};
      this.isAllChecked = false;
      this.isIndeterminate = false;
    }
  }

  // 勾选框-单选
  checkRadio(id, value) {
    this.checkedRows = {
      [id]: value,
    };
  }

  // 全选、取消全选
  checkAll(value) {
    this.tableData.forEach((item) => (this.checkedRows[item.id] = value));
    this.refreshStatus();
  }

  // 获取选中行id、行data
  checkedIdsFn() {
    this.checkedIds = [];
    this.checkedData = [];
    for (let id in this.checkedRows) {
      if (this.checkedRows[id]) {
        this.checkedIds.push(id);
        this.checkedData.push(
          this.tableData.find((item) => {
            return item.id == id;
          })
        );
      }
    }
  }

  // 按钮区：新增
  create(tab: any = {}) {
    if (tab.id) this.tab = tab;
    this.MenuService.createTab({
      type: 'create',
      pid: this.tab.id,
      name: this.i18n.baseList.create + this.tab?.name,
    });
  }
  // 按钮区：删除
  deleteInit(confirmInfo, options) {
    this.tip.confirm(confirmInfo, () => {
      this.checkedIdsFn();
      this.tipModal.batch({
        nzTitle: this.i18n.baseList.delete,
        checkedData: this.checkedData,
        columns: options.columns,
        doFn() {
          options.doFn();
        },
        resFn(successData) {
          // 批量删除后，请求最近有数据的一页（需要判断现在页请求的话有无数据）
          if (successData.length) {
            let page = (this.tableTotal - successData.length) / this.tableSize;
            if (this.tablePage > page) {
              this.tablePage = Math.ceil(page);
            }
          }
          if (this.tablePage < 1) {
            this.tablePage = 1;
          }
          this.checkedRows = {};
          options.resFn?.();
        },
      });
    });
  }
  // 操作列：修改
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