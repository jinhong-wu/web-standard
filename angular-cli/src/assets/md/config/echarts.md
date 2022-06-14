# 全部用法
官方连接  
ECharts：https://echarts.apache.org/examples/zh/index.html  
ngx-echarts：https://github.com/xieziyu/ngx-echarts
- 安装
```typescript
npm install echarts@5.3.0
npm install ngx-echarts@6.0.1
npm install @types/echarts@4.9.12
```
- 配置
```typescript
// angular.json
"architect": {
	"build": {
		"options": {
			"scripts": [
				"./node_modules/echarts/dist/echarts.min.js"
			]
		}
	}
}
```
```typescript
// A模块使用-模块注入
import {NgxEchartsModule} from 'ngx-echarts';
import * as echarts from 'echarts';
imports: [
	NgxEchartsModule.forRoot({echarts: {init: echarts.init}}),
]
```
- 使用
```html
<!-- nz-spin加载效果（必须） -->
<nz-spin [nzSpinning]="chartLoading">
	<div echarts [options]="chartOption" (chartClick)="chartClick($event)" style="width: 100%; height: 500px;"></div>
</nz-spin>
```  