# 全部用法
官方连接：https://github.com/VadimDez/ng2-pdf-viewer
- 安装（版本必须使用下方，其他版本有问题）
```javascript
npm install ng2-pdf-viewer@5.3.4
npm install pdfjs-dist@2.5.207
```
- 配置
<!--// angular.json
"architect": {
	"build": {
		"options": {
			"scripts": [
				"./node_modules/pdfjs-dist/build/pdf.worker.min.js"
			]
		}
	}
}-->
```javascript
// A模块使用-模块注入
import { PdfViewerModule } from 'ng2-pdf-viewer';
imports: [PdfViewerModule]
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
  