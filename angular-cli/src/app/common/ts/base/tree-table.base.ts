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

	@ViewChild('leftTree', { static: false }) leftTree: any;
	treeNodes: any = [];
	treeNodes0: any = {};
	treeSearch = '';
	clickNode: any = {};  // 左键点击node
	selectNode: any = {};  // 右键选择node

	async treeNodesFn(node) {
		await this.TreeNodesService.promise(node);
		let { treeNodes, treeNodes0 } = this.TreeNodesService.copyNodes(node);
		this.treeNodes = treeNodes;
		this.treeNodes0 = treeNodes0;
	}
	
	// 默认展开根节点
	searchChange() {
		if (this.treeSearch == '' && this.treeNodes.length) {
			this.leftTree.getTreeNodeByKey(this.treeNodes0.key).isExpanded = true;
		}
	}

	// 搜索高亮
	searchLight(title: string) {
		if (this.treeSearch) {
			let search = ``;
			for(let i=0,len=this.treeSearch.length; i<len; i++) {
				if('()[]'.includes(this.treeSearch[i])) {
					search += `\\${this.treeSearch[i]}`;
				} else {
					search += this.treeSearch[i];
				}
			}
			let reg = new RegExp(search, "gi");
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

