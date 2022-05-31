import { Injector, Input, ViewChild } from '@angular/core';
import { BaseTs } from './base';
import { TipModalService } from 'src/app/common/service/tip-modal.service';
import { DatePipe } from '@angular/common';
import { RenderPipe } from '../../pipe/render.pipe';
import { DownloadService } from '../../service/download.service';

interface tableInit {
  reset: boolean;  // 是否初始化page数据
  advance: boolean;  // 是否为精确查询
  tableService: any;  // table-api所在service
  tableData: string; // table-api所在service-方法名
	params?: boolean;  // 是否刷新请求参数（为false时，advance值不运行）
  paramsFn?: Function;  // 请求参数回调函数
  successFn?: Function; // 请求成功回调函数
  errorFn?: Function;  // 请求失败回调函数
}
export class TableBaseTs extends BaseTs {
  public tipModal;
  public download;
  constructor(public injector: Injector) {
    super(injector);
    this.tipModal = injector.get(TipModalService);
    this.download = injector.get(DownloadService);
  }

  @ViewChild('tableHead', { static: false }) tableHead: any = {};
  @Input() tab: any = {};
  @Input() treeParamKey: string = '';  // 左树右表格-树params对应的key
  @Input() clickNode: any = {};  // 左树右表格-左键点击node

	tableName: string = ""; // 是否删除所选tableName
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
  checkedRows: { [key: string]: any } = {};
  checkedIds: any = [];
  checkedData: any = [];
  isAllChecked: Boolean = false;
  isIndeterminate: Boolean = false;
	// 子表格功能
	expandRows: { [key: string]: any } = {};
  // 导出
	exportKey = 'ids';  // 对应参数
  exportUrl = '';  // url
	// 可配置列
	colsData: any = [];
  // 精确查询
  advanceData: any = [];
  advanceDataDate = [  // 精确查询-开始结束时间
    {
      key: 'startDt',
      type: 'date',
      placeholder: this.i18n.baseList.startDt,
    },
    {
      key: 'endDt',
      type: 'date',
      placeholder: this.i18n.baseList.endDt,
    },
  ];

  // 数据初始化
  tableInit({ reset = false, advance = false, params = true, paramsFn, tableService, tableData, successFn, errorFn }: tableInit) {
    if (reset) {
			this.tablePage = 1;
			this.tableParams.page = this.tablePage - 1;
		}
		// 是否刷新tableParams数据
		let next = params ? this.tableParamsFn(advance, paramsFn) : true;
    if (next) {
      this.tableLoading = true;
      tableService[tableData].call(tableService, this.HttpUtilTs.paramsFn(this.tableParams)).subscribe((res) => {
        this.tableLoading = false;
        // 对于数据量大的接口，后台只会在需要请求total时返回，例如：第一页、第10001页,其他情况下total可能是个undefined值，故做此判断
        if (![null, undefined].includes(res.total)) {
          this.tableTotal = res.total || 0;
        };
        this.tableData = res.data || [];
        successFn?.call(this, res);
      }, () => {
        this.tableLoading = false;
        errorFn?.call(this);
      });
    }
  }

  // 请求参数
  tableParamsFn(advance = false, fn?: Function): boolean {
    this.tableParams = {
      page: this.tablePage - 1,
      size: this.tableSize,
    };
    if (this.orderBy) {
      this.tableParams.orderBy = this.orderBy;
    }
    // 精确查询传参
    if (advance) {
      this.advanceData.forEach((d) => {
        if (typeof d.value === 'string') d.value = d.value?.trim();
        this.tableParams[d.key] = d.value;
      });
    } else if (this.tableHead?.fuzzyQuery) {
      this.tableParams.fuzzyQuery = this.tableHead?.fuzzyQuery?.trim();
    }
    // 结束时间须在开始时间之后
    if (this.tableParams.startDt || this.tableParams.endDt) {
      this.tableParams.startDt = this.tableParams.startDt ? new DatePipe('zh').transform(this.tableParams?.startDt, 'yyyy-MM-dd HH:mm:ss') : null;
      this.tableParams.endDt = this.tableParams.endDt ? new DatePipe('zh').transform(this.tableParams?.endDt, 'yyyy-MM-dd HH:mm:ss') : null;
      if (this.tableParams.startDt < this.tableParams.endDt) {
        this.tip.msg('warning', this.i18n.baseList.confirmDt);
        return false;
      }
    }
    // 左树有表格
    if (this.treeParamKey && this.clickNode?.key) {
      this.tableParams[this.treeParamKey] = this.clickNode.key;
    }
		fn?.call(this);
    return true;
  }

  // 排序功能
  sortFn(sort, fn: Function) {
    this.orderBy = sort.key + ' ' + (sort.value == "ascend" ? "asc" : "desc");
    fn.call(this);
  }

  // 勾选框-刷新勾选状态
  refreshStatus() {
    if (this.tableData.length > 0) {
      this.isAllChecked = this.tableData.every(d => this.checkedRows[d.id]);
      this.isIndeterminate =
        this.tableData.some((d) => this.checkedRows[d.id]) && !this.isAllChecked;
    } else {
      this.isAllChecked = false;
      this.isIndeterminate = false;
    }
  }

  // 勾选框-多选、单选
  checkbox(item, checkbox: boolean = true) {
    if (checkbox) {
      if (this.checkedRows[item.id]) {
        this.checkedRows[item.id] = item;
      } else {
        delete this.checkedRows[item?.id];
      };
      this.refreshStatus();
    } else {
      if (this.checkedRows[item.id]) {
        this.checkedRows = {
          [item.id]: item,
        };
      } else {
        delete this.checkedRows[item?.id];
      };
    };
  }

  // 勾选框-全选、取消全选
  checkAll(value) {
    this.tableData.forEach((d) => {
      if (value) {
        this.checkedRows[d.id] = d;
      } else {
        delete this.checkedRows[d.id]
      }
    });
    this.refreshStatus();
  }

  // 勾选框-获取选中行id、行data
  checkedIdsFn() {
    this.checkedIds = Object.keys(this.checkedRows);
    this.checkedData = Object.values(this.checkedRows);
  }

  // 按钮区：新增
  create(data: any = {}, tab: any = {}) {
    if (tab.id) this.tab = tab;
    this.MenuService.createTab({
      type: 'create',
      pid: this.tab.id,
      name: this.i18n.baseList.create + this.tableName,
      data: data  // 可带码表之类的数据，避免重复请求
    });
  }
  // 按钮区：删除
  delete(confirmInfo, options) {
    let _this = this,
			confirm = new RenderPipe().transform(this.i18n.baseList.deleteConfirm, { name: confirmInfo || this.tableName });
    this.tip.confirm(confirm, () => {
      this.checkedIdsFn();
      if (this.checkedData.length == 0) {
        this.tip.msg('warning', this.i18n.baseList.checkTip);
        return false;
      }
      this.tipModal.delete({
        checkedData: this.checkedData,
        columns: options.columns,
        doFn(data) {
          return options.doFn?.call(_this, data);
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
					// 请求表格数据，且reset = false, advance = false, params = false
					options.resFn?.call(_this, false, false, false);
        },
      });
    });
  }
  // 操作列：修改
  update(data: any = {}, name = 'name', tab: any = {}) {
    if (tab.id) this.tab = tab;
    this.MenuService.createTab({
      type: 'update',
      pid: this.tab.id,
      name: this.i18n.baseList.update + '：' + (data[name] || ''),
      data: data,  // 修改行的数据
    });
  }

	// 按钮区：导入
	import(options) {
    let _this = this;
		this.tipModal.file({
      importUrl: options.importUrl,
      tempUrl: options.tempUrl,
      resFn() {
				options.resFn?.call(_this);
      },
    });
  }

  // 按钮区：导出
  export(type: 'search' | 'checked' = 'search', confirmInfo = '', options: any = {}) {
    let confirm = '',
      url = this.exportUrl,
      isParams = true,
      params = null;
    if (type == 'search') {
      confirm = this.i18n.baseList.exportSearchConfirm;
      isParams = this.tableParamsFn(true, options.paramsFn);
      params = this.HttpUtilTs.getHttpParam(this.tableParams);
    } else {
      confirm = new RenderPipe().transform(this.i18n.baseList.exportConfirm, { name: confirmInfo || this.tableName });
      this.checkedIdsFn();
      if (this.checkedIds.length == 0) {
        this.tip.msg('warning', this.i18n.baseList.checkTip);
        isParams = false;
      }
      url += this.HttpUtilTs.getString({ [this.exportKey]: this.checkedIds });
    }
    if (isParams) {
      this.tip.confirm(confirm, () => {
        this.download.down(url, { params }).subscribe();
      });
    }
  }
}