# 必读！！！
- 页面提示：统一放在菜单tab下。
- 表格提示：统一放在按钮下，表格上。
- 表单提示：统一放在输入框下，按钮上。
- 数值都用千位分隔符展示（angular自带过滤器：number）
```html
{{ 1234 | number }} 
<!-- 展示为：1,234 -->
```

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

可点击
![image-1](assets/md/imgs/card-box-click.png)

**使用：**
- 可点击卡片：class="card-item-click" [class.active]=""
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

# 下拉框-带查询按钮  
**文件：common.less**  
**页面效果：**
![image-1](assets/md/imgs/input-select.png)  
**使用：**
```html
<nz-input-group nzSearch [nzAddOnAfter]="suffixButton" style="width: 30%">
	<nz-select nzShowSearch nzAllowClear nzDropdownMatchSelectWidth [ngModel]="'Sign Up'">
		<nz-option [nzLabel]="'Sign Up'" [nzValue]="'Sign Up'"></nz-option>
		<nz-option [nzLabel]="'Sign In'" [nzValue]="'Sign In'"></nz-option>
	</nz-select>
</nz-input-group>
<ng-template #suffixButton>
	<button nz-button nzType="primary" nzSearch>查询</button>
</ng-template>
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

# 表格-Table

**文件：common.less**

**使用：**
- th宽度 - 多选框：checkbox
- th宽度 - 时间：time（yyyy-MM-dd HH:mm:ss）
- th宽度 - 时间：time-short（yyyy-MM-dd）
- th宽度 - IP：ip

```css
table {
  tr {
    th.center,
    td.center {
      text-align: center;
    }
  }
}
```

# 加载动画
- 卡片：nz-spin加载效果（必须）
```html
<nz-spin [nzSpinning]="cardLoading">
	<div class="card-box">
	</div>
</nz-spin>
```
- 表格：[nzLoading]="tableLoading"（必须）
```html
<nz-table [nzLoading]="tableLoading">
</nz-table>
```
- 表单：nz-spin加载效果（必须）
```html
<nz-spin [nzSpinning]="formLoading">
	<div class="form-content">
		<form nz-form [formGroup]="form">
		</form>
	</div>
	<div class="form-footer">
	</div>
</nz-spin>
```
- 弹出框：nz-spin加载效果（必须）
```html
<nz-spin [nzSpinning]="modalLoading">
	<div class="content">
	</div>
	<div class="footer">
	</div>
</nz-spin>
```
- 图表：nz-spin加载效果（必须）
```html
<nz-spin [nzSpinning]="chartLoading">
	<div echarts [options]="chartOption" style="width: 100%; height: 500px;"></div>
</nz-spin>
```

# 无数据/空状态  

**页面效果：**
![image-1](assets/md/imgs/empty.png)

**使用：**
```html
<!-- 统一使用 -->
<nz-empty nzNotFoundImage="simple"></nz-empty>
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
