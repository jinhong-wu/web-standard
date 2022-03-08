# 上传/导入文件

**文件：**
- 统一方法：TipModalService（common/service/tip-modal.service.ts）
- 统一组件：ImportFileComponent（common/component/import-file/import-file.component.ts）

**页面效果：**
![image-1](assets/md/imgs/upload-file.png)

**使用-参数：**
- importUrl：上传/导入路径，必传
- templateUrl：下载模板地址
- accept：接受数据类型，默认.xlsx
- size：接受数据大小，默认不限制，单位：KB
- close：下载弹框关闭后操作
```typescript
this.TipModalService.file({
	importUrl: '',
	templateUrl: '',
	close(compo) {
		// 右上角关闭弹出框后操作
	}
});
```

# 大文件上传（串行分片）

和上传/导入文件相同  
**使用-参数：**
- bigSize：大文件界限大小（超过即为大文件分片上传），默认为50MB，单位：KB
- bigSingle：大文件分片大小，默认为10MB，单位：KB
- bigInitUrl：大文件传输前初始化url（告知后端分片数量等信息）

# 下载文件

**文件：**
- 统一方法：DownloadService（common/service/download.service.ts）  

**使用-参数：**
- url：下载地址，必传
- type：下载类型（excel、file），默认file
```typescript
this.DownloadService.down(url).subscribe((loading) =>{
	// 返回下载状态，进行操作
});
```
