import {
  Component,
  Injector,
  Output,
  Input,
  EventEmitter,
	OnChanges,
	SimpleChanges,
} from '@angular/core';
import { BaseTs } from '../../ts/base/base';

interface advanceData {
  key: string; // 对应param参数
  type: string; // 输入框类型（文字输入框text、下拉框select）
  value?: string | number; // ngModel输入值
  options?: Array<any>; // type: 'select'时，必传
	nzValue?: string;  // type: 'select'时，对应的nzValue参数
	nzLabel?: string;  // type: 'select'时，对应的nzLabel参数
  nodes?: []; // type: 'tree'时，必传
  placeholder?: string; // placeholder提示文字
  style?: {
    // .item样式
    // .item盒子新增class，更多class查看common.less .table-head
    //（输入框宽度.width2 >.width-short，为了美观，width2数据建议放在最后）
    class?: string;
  };
}

interface colsData {
  title: string; // 列名
  key: string; // 列key
  show?: boolean; // 是否展示
  sort?: boolean; // 是否支持排序
  class?: string; // 列class
  width?: string; // 列宽度
}

@Component({
  selector: 'app-table-head',
  templateUrl: './table-head.component.html',
  styleUrls: ['./table-head.component.less'],
})
/**
 * @name 表格-上方操作区
 * @param search 获取表格数据方法（fuzzyShow = true时必传，false时可不传）
 * @param fuzzyShow 右侧查询区-输入框，默认true显示
 * @param placeholder 右侧查询区-输入框placeholder，默认'输入关键字进行查询'
 * @param advanceData 精确查询数据，参考interface advanceData
 * @param colsData 可配置列数据，参考interface colsData
 * @param exportShow 精确查询-导出，默认false隐藏 
 * @param export 精确查询-导出方法（exportShow = true时必传，false时可不传）
 * @example
  #tableHead 必须取此名
  tableDataFn(true, $event)  // 参数：是否刷新页数, 是否为精确查询

  <app-table-head #tableHead (search)="tableDataFn(true, $event)" [exportShow]="'true'" (export)="export()" [advanceData]="advanceData" [colsData]="colsData">
    <ng-container ngProjectAs="btns">
      <button nz-button nzType="primary">新增</button>
      <button nz-button nzType="primary" [disabled]="!isAllChecked && !isIndeterminate">删除</button>
    </ng-container>
    <ng-container ngProjectAs="tips">
      <nz-alert nzShowIcon nzType="warning" nzMessage="表格提示：统一放在按钮下，表格上。"></nz-alert>
    </ng-container>
  </app-table-head>
*/
export class TableHeadComponent extends BaseTs implements OnChanges {
  constructor(public injector: Injector) {
    super(injector);
  }

  @Output() search = new EventEmitter<boolean>();
  @Input() fuzzyShow: any = true;
  @Input() placeholder: string = this.i18n.baseList.placeholder;
  @Input() advanceData: advanceData[] = [];
  @Input() colsData: colsData[] = [];
  @Input() exportShow: any = false;
  @Output() export = new EventEmitter<string>();

  // 关键字查询
  fuzzyQuery: string = '';
  // 精确查询
  advanceShow: boolean = false;
  // 可配置列
  colsDataCopy: any = [];
  isAllChecked: boolean = false;
  isIndeterminate: boolean = false;

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.colsData?.currentValue) {
			this.colsDataCopy = JSON.parse(JSON.stringify(changes.colsData.currentValue));
      this.colRefresh();
		}
	}

  // 查询
  searchFn(advance: boolean = false) {
    // advance：是否为精确查询
    this.search.emit(advance);
  }

  // 精确查询-导出查询结果
  exportSearchFn() {
    this.export.emit();
  }

  // 可配置列-刷新
  colRefresh() {
    this.isAllChecked = this.colsData.every((item) => item.show);
    this.isIndeterminate =
      this.colsData.some((item) => item.show) && !this.isAllChecked;
  }
  // 可配置列-全选
  allCheckFn() {
    this.isIndeterminate = false;
    this.colsData.forEach((item) => {
      item.show = this.isAllChecked;
    });
  }
  // 可配置列-重置
  resetCheckFn() {
    this.colsData.forEach((d, index) => {
      d.show = this.colsDataCopy[index].show;
    });
    this.colRefresh();
  }
}
