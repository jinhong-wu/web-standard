import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

/**
 * @name 树数据
*/

@Injectable({
  providedIn: 'root'
})
export class TreeNodesService {
  constructor(
		public ApiService: ApiService
	) {
		this.testNodesFn();
	}

	testNodes: any = [];
	testNodes0: any = {};
	
	testNodesFn() {
		this.ApiService.getTestTree().subscribe((res) => {
			let nodes = [];
      res.forEach((t) => {
				nodes.push({
					title: t.name,
					key: t.id,
					children: [],
					id: t.id,
					pid: t.pid,
				});
			});
			this.testNodes = this.treeNodesFn(nodes);
			if (this.testNodes[0]) {
				this.testNodes[0].expanded = true;
				this.testNodes0 = this.testNodes[0];
			};
    });
	}

	// 数据分类
	// 数据分级
	// 资产组
	// 组织机构
	// 数据标签

	// 数据处理-pid格式
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
		return result;
	}

	// 数据处理-childList格式
	treeNodesFnObject(data: Array<any> = []) {
		data.forEach((item) => {
			if (item.id) {
				item['key'] = item.id;
			}
			if (item.name) {
				item['title'] = item.name;
			}
			if (item.childList) {
				item['children'] = item.childList;
				item['isLeaf'] = item.childList.length > 0 ? false : true;
				item.childList.forEach((child) => {
					this.treeNodesFnObject([child]);
				});
			} else {
				item['isLeaf'] = true;
			};
		});
		return data;
	}

	// 数据处理-非叶子节点禁用复选框
	disableCheckbox(data: Array<any> = []) {
		// 为了不影响原树数据：data = JSON.parse(JSON.stringify(this.TreeNodesService.xxx));
		data.forEach((item) => {
			if (item.hasOwnProperty("children")) {
				item.disableCheckbox = true;
				this.disableCheckbox(item.children);
			} else {
				item.disableCheckbox = false;
			}
		});
	}

}	
