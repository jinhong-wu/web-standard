import { Injector } from '@angular/core';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { TableBaseTs } from './table.base';
/**
 * @name 树-基本属性及方法
 */
export class TreeTableBaseTs extends TableBaseTs {

	private nzContextMenuService;
  constructor(public injector: Injector) {
    super(injector);
		this.nzContextMenuService = this.injector.get(NzContextMenuService);
  }

	tree: any;

	treeSearch = '';
  treeNodes = [];
	treeNode0: any = {};
	clickNode: any = {};  // 左键点击node
	selectNode: any = {};  // 右键选择node


	treeNodesFn(data: Array<any> = []) {
    let result = [],
			map = {},
			pidMap = {};
    data.forEach((item) => {
			delete item.children;
      map[item.id] = item;
      if(item.pid && item.pid.length){
        pidMap[item.pid] = true
      }
    });
    data.forEach((item) => {
      let parent = map[item.pid];
      if(pidMap[item.id] == null){
        item.isLeaf = true
      }
      if (parent) {
        (parent.children || (parent.children = [])).push(item);
      } else {
        result.push(item);
      }
    });
		if (result[0]) {
			result[0].expanded = true;
		};
		this.treeNode0 = result[0] || [];
    return result;
  }

	// 默认展开根节点
	searchChange() {
		if (this.treeSearch == '' && this.treeNodes.length) {
			this.tree.getTreeNodeByKey(this.treeNode0.key).isExpanded = true;
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

