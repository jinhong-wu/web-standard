# 必读！！！
- 所有input、select等都需要placeholder  
  表格精确查询input：列名1  
	表格模糊查询input：请输入列名1、列名2  
- 所有查询input支持enter查询，包括精确查询里的input
	```html
	<input nz-input [(ngModel)]="fuzzyQuery" (keydown.enter)="searchFn()" placeholder="请输入xxx">
	```
- 搜索/查询，统一为 查询
- input最小宽度必须完全显示中文，英文不做要求（BUG编号22968）