import {
  Component,
  Injector,
  Output,
  Input,
  EventEmitter,
	OnChanges,
	SimpleChanges,
} from '@angular/core';
import { AdvanceData, ColsData } from '../../entity/table';
import { BaseTs } from '../../ts/base';
/**
 * @name 表格-上方操作区
 * @param search 获取表格数据方法（fuzzyShow = true时必传，false时可不传）
 * @param fuzzyShow 右侧查询区-输入框，默认true显示
 * @param placeholder 右侧查询区-输入框placeholder
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

@Component({
  selector: 'app-table-head',
  templateUrl: './table-head.component.html',
  styleUrls: ['./table-head.component.less'],
})
export class TableHeadComponent extends BaseTs implements OnChanges {
  constructor(public injector: Injector) {
    super(injector);
  }

  @Output() search = new EventEmitter<boolean>();
  @Input() fuzzyShow: any = true;
  @Input() placeholder: string = "";
  @Input() advanceData: AdvanceData[] = [];
  @Input() colsData: ColsData[] = [];
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
