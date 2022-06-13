# 全部用法
官方连接：https://github.com/VadimDez/ng2-pdf-viewer
- 安装（版本必须使用下方，其他版本有问题）
```javascript
// Angular10还未具体测试过...到时再看
npm install ng2-pdf-viewer@5.3.4
npm install pdfjs-dist@2.5.207
```
- 配置
```javascript
// 方法一：angular.json配置，这种方法偶尔会有第一次不加载pdf的情况（不推荐，具体原因未知）
"architect": {
	"build": {
		"options": {
			 "assets": [
					{
						"glob": "pdf.worker.min.js",
						"input": "node_modules/pdfjs-dist/build/",
						"output": "/assets/lib/"
					}
				],
		}
	}
}
// 方法二：直接在本地创建assets/lib/pdf.worker.min.js文件
// pdf.worker.min.js直接在node_modules/pdfjs-dist/build/pdf.worker.min.js复制
```
```javascript
// A模块使用-模块注入
import { PdfViewerModule } from 'ng2-pdf-viewer';
imports: [PdfViewerModule]
// 全局 pdf预览加载js
(<any>window).pdfWorkerSrc = 'assets/lib/pdf.worker.min.js';   
```
- 使用
```html
<pdf-viewer [src]="url" [original-size]="true" style="width: 500px; height: 500px"></pdf-viewer>
	<!--
url = "https://...."
url = {
		url: "https://....",
		withCredentials: false,
		httpHeaders: { 'Authorization': '' },
	}
	-->
```
  