import { Injector, ViewChild } from '@angular/core';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { TreeNodesService } from '../../service/tree-nodes.service';
import { TableBaseTs } from './table.base';
/**
 * @name 树-基本属性及方法
 */
export class TreeTableBaseTs extends TableBaseTs {

	public TreeNodesService;
	public nzContextMenuService;
  constructor(
		public injector: Injector
	) {
    super(injector);
		this.TreeNodesService = this.injector.get(TreeNodesService);
		this.nzContextMenuService = this.injector.get(NzContextMenuService);
  }

	@ViewChild('leftTree', { static: false }) tree: any;

	treeSearch = '';
	clickNode: any = {};  // 左键点击node
	selectNode: any = {};  // 右键选择node

	// 默认展开根节点
	searchChange(tree) {
		if (this.treeSearch == '' && this.TreeNodesService[tree].length) {
			this.tree.getTreeNodeByKey(this.TreeNodesService[tree+0].key).isExpanded = true;
		}
	}

	// 搜索高亮
	searchLight(title: string) {
		if (this.treeSearch) {
			let reg = new RegExp(this.treeSearch, "gi");
			title = title.replace(reg, (match)=>{
				return `<span class="font-highlight">${match}</span>`
			});
		}
		return title;
	}

	// 右键操作
	contextMenu(
    e: NzFormatEmitEvent,
    menu: NzDropdownMenuComponent,
  ): void {
		let node = e.node.origin;
		if (!node.disabled) {
			this.selectNode = node;
			this.nzContextMenuService.create(e.event, menu);
		}
  }

	clickNodeFn(e, fn?: Function) {
		let node = e.node.origin;
		this.clickNode = this.clickNode.key == node.key ? {} : node;
		fn && fn.call(this, true);  // 刷新表格数据
	}

}

