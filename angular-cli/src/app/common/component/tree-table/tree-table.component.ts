import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { I18nService } from '../../service/system/i18n.service';

@Component({
  selector: 'app-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.less']
})
/**
 * @name 左树右表格
 * @param searchShow 是否显示查询输入框，默认true显示
 * @param searchValue 查询值（searchShow = true时必传，false时可不传）
 * @param width 树宽度，默认300px
 * @param resizable 是否可拖动，默认true（200px<width<50%）
 * @example
	<app-tree-table [(searchValue)]="treeSearch" searchShow resizable>
		<ng-container ngProjectAs="tree">
			<!-- nz-tree -->
		</ng-container>
		<ng-container ngProjectAs="table">
			<!-- nz-table -->
		</ng-container>
	</app-tree-table>
*/
export class TreeTableComponent implements OnInit {
  constructor(public i18n: I18nService) {}

	@Input() searchShow = true;
	@Input() searchValue: any;
	@Output() searchValueChange = new EventEmitter<string>();
	@Input() width: any = 300;
	@Input() resizable: boolean = true;

	id = null;

  ngOnInit(): void {}

	onResize({ width }: NzResizeEvent): void {
		cancelAnimationFrame(this.id);
		this.id = requestAnimationFrame(() => {
			this.width = width!;
		});
	}

	modelChange() {
		this.searchValueChange.emit(this.searchValue)
	}

}