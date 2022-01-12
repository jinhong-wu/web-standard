import { Component, OnInit, Injector, Output, Input, EventEmitter } from '@angular/core';
import { BaseComponent } from '../base/base.component';

interface advanceData {
  key: string;  // 对应param参数
  type: string;  // 输入框类型（文字输入框text、下拉框select）
  value?: string | number; // ngModel输入值
	options?: advanceDataOptions[]  // type:'select'时，必传
	placeholder?: string  // placeholder提示文字
	style?: {  // .item样式
		// .item盒子新增class，更多class查看common.less .table-head
		//（输入框宽度.width2 >.width-short，为了美观，width2数据建议放在最后）
		class?: string
	}	
}
interface advanceDataOptions {
  label: string;
  value: string;
}

interface colsData {
	key: string,  // 列key
	value: string,  // 名称
	show: boolean,  // 是否展示
	sort: boolean, // 是否支持排序
	class?: string,  // 列class
	width?: string  // 列宽度
}

@Component({
  selector: 'app-table-head',
  templateUrl: './table-head.component.html',
  styleUrls: ['./table-head.component.less']
})
/**
 * @name 表格-上方操作区
 * @param searchShow 右侧搜索区，默认true显示
 * @param search 获取表格数据方法（searchShow = false时可不传，true时必传）
 * @param advanceShow 精确查询，默认false隐藏
 * @param advanceData 精确查询数据，参考interface advanceData（advanceShow = false可不传，true时必传）
 * @param colsData 可配置列数据，参考interface colsData
 * @example
 * tableDataFn(true, $event)  // 参数：是否刷新页数, 是否为精确查询
 * <ng-container ngProjectAs="btns">
 * 		左侧按钮区
 * </ng-container>
 * 
 * <app-table-head (search)="tableDataFn(true, $event)" [advanceData]="advanceData" [advanceShow]="advanceShow" [colsData]="colsData">
		<ng-container ngProjectAs="btns">
			<button nz-button nzType="primary">新增</button>
			<button nz-button nzType="primary" [disabled]="!isAllChecked && !isIndeterminate">删除</button>
		</ng-container>
	 </app-table-head>
 */
export class TableHeadComponent extends BaseComponent implements OnInit {

  constructor(
		public injector: Injector,
	) {
		super(injector);
	}

	@Input() searchShow: any = true;
	@Output() search = new EventEmitter<boolean>(); 
	@Input() advanceShow: any = false;
	@Input() advanceData: advanceData[] = [];
	@Input() colsData: colsData[] = [];

	// 可配置列
	colsDataCopy: any = [];
	isAllChecked: boolean = false;
  isIndeterminate: boolean = false;

  ngOnInit() {
		if (this.colsData.length > 0) {
			this.colsDataCopy = JSON.parse(JSON.stringify(this.colsData));
			this.colRefresh();
		}
  }

	// 查询
	searchFn(advance: boolean = false) {
		// advance：是否为精确查询
		this.search.emit(advance);
	}

	// 精确查询-导出查询结果
  exportSearchFn(){
  }

	// 可配置列-刷新
	colRefresh() {
		this.isAllChecked = this.colsData.every(item => item.show);
    this.isIndeterminate = this.colsData.some(item => item.show) && !this.isAllChecked;
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
