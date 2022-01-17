# 全局变量

**文件：common-name.less**

**使用：尽可能引用全局变量，以便统一规范及修改**
- @headerH：顶部以及导航高度
- @space：元素间距
- 字体颜色、背景颜色......

```typescript
// 在对应.less文件顶部导入
@import url("~src/common-name");
```


# 模块盒子（inner-box）
**文件：common.less**

**页面效果：**
![image-1](assets/md/imgs/inner-box.png)

**使用：**
- 模块盒子：inner-box
- 模块盒子-带阴影：inner-box-shadow
- 模块标题：inner-title
- 模块标题-带样式：inner-title-border

```html
<div class="inner-box-shadow">
	<div class="inner-title">模块标题</div>
	<div class="inner-title-border">模块标题-带样式</div>
</div>
```
# 统计卡片（card-box）
**文件：common.less**

**页面效果：**
![image-1](assets/md/imgs/card-box.png)

**使用：**
- 可点击卡片：card-item click
- 数量增多/减少：up/down

```html
<!-- nz-spin 加载效果（必须） -->
<nz-spin [nzSpinning]="cardLoading">
	<div class="card-box">
		<div class="card-item" *ngFor="let item of cardList">
			<div class="num">
				<div class="total">
					{{item.cnt | number}}<span class="unit">个</span>
				</div>
				<div class="trend" [class.up]="item.trend=='up'">
					{{item.trendCnt}}{{item.unit}}
					<!-- img必须使用ngIf判断是否加载成功，否则图片初始加载为404 -->
					<img *ngIf="item.trend" [src]="'assets/imgs/common/'+item.trend+'.png'" />
				</div>
			</div>
			<div class="title">{{item.value}}</div>
		</div>
	</div>
</nz-spin>
```

# 字体颜色（ft-xxx）

**文件：common.less**

**使用：**
- 红色（危险、失败）：ft-red、bg-red
- 橙色（中危、可疑）：ft-orange、bg-orange
- 黄色（低危、进行中）：ft-yellow、bg-yellow
- 绿色（安全、完成）：ft-green、bg-green
- 蓝色（跳转链接）：ft-blue、bg-blue
- 灰色（不可操作）：ft-gray、bg-gray

```css
/* ft-xxx字体颜色、bg-xxx背景颜色*/
.ft-orange {
  color: @ft-orange  !important;
}
.bg-orange {
  background-color: @bg-orange  !important;
}
```

# 表格-头部操作区（table-head）

**文件：common.less**

**页面效果：**
![image-1](assets/md/imgs/table-head.png)

**使用：**
```html
<div class="table-head">
	<!-- 左侧按钮区 -->
	<div class="btns">
		<button nz-button nzType="primary">按钮一</button>
		<button nz-button nzType="primary" [disabled]="'true'">按钮二</button>
	</div>
	<!-- 右侧查询区 -->
	<div class="search">
		<nz-input-group class="search-input" nzSearch [nzAddOnAfter]="suffixButton">
			<input nz-input placeholder='输入关键字进行查询' (keydown.enter)="tableDataFn(true)">
		</nz-input-group>
		<ng-template #suffixButton>
			<button nz-button nzType="primary" nzSearch (click)="tableDataFn(true)">
				<i nz-icon nzType="search"></i>
			</button>
		</ng-template>
		<!-- 右侧查询区-精确查询 -->
		<button nz-button nzType="primary">
			<i nz-icon nzType="up" nzTheme="outline"></i>
		</button>
	</div>
</div>
```

# 表格-Table

**文件：common.less**

**使用：**
- th宽度 - 多选框：checkbox
- th宽度 - 时间：time（yyyy-MM-dd HH:mm:ss）
- th宽度 - 时间：time-short（yyyy-MM-dd）
- th宽度 - IP：ip

```
table {
  tr {
    th.center,
    td.center {
      text-align: center;
    }
  }
}
```

# 【布局】左树右表格
**文件：common.less**

**页面效果：**
![image-1](assets/md/imgs/tree-table.png)

**使用：**
```html
<div class="tree-table">
	<!-- 左侧树 -->
	<div class="left-tree">
		<nz-input-group nzSearch [nzAddOnAfter]="suffixIcon">
			<input nz-input [(ngModel)]="treeSearch" placeholder="输入关键字进行查询" />
		</nz-input-group>
		<ng-template #suffixIcon>
			<button nz-button nzType="primary" nzSearch>
				<i nz-icon nzType="search"></i>
			</button>
		</ng-template>
		<nz-tree [nzData]="treeData" [nzSearchValue]="treeSearch"></nz-tree>
	</div>
	<!-- 右侧列表 -->
	<div class="right-table">
		<!-- 查阅：公共示例-Table 表格 -->
	</div>
</div>
```

# 加载动画
- 卡片
```html
<!-- nz-spin 加载效果（必须） -->
<nz-spin [nzSpinning]="cardLoading">
	<div class="card-box">
	</div>
</nz-spin>
```
- 表格
```html
<!-- [nzLoading]="tableLoading"（必须） -->
<nz-table [nzLoading]="tableLoading">
</nz-table>
```
- 弹出框
```html
<!-- nz-spin 加载效果（必须） -->
<nz-spin [nzSpinning]="formLoading">
	<div class="content">
	</div>
	<div class="footer">
	</div>
</nz-spin>
```

# 省略号（ellipsis）
使用
```html
<!-- html -->
<div class="ellipsis"></div>
<!-- less -->
.text {
	width: 100px;
	.ellipsis();
}
```
