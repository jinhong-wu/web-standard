import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { I18nService } from '../../service/system/i18n.service';

@Component({
  selector: 'app-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.less']
})
export class TreeTableComponent implements OnInit {
  constructor(public i18n: I18nService) {
  }

	@Input() searchValue: any;
	@Output() searchValueChange = new EventEmitter<string>();
	@Input() resizable: boolean = true;

	// 树宽可拖动
	id = null;
	width = null;

  ngOnInit(): void {
  }


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
