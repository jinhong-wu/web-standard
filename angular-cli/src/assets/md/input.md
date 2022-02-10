# 注意！！！
- 所有查询input支持enter查询
```html
<input nz-input [(ngModel)]="keyword" (keydown.enter)="searchFn()" placeholder="输入关键字查询">
```
- 搜索/查询，统一为 查询