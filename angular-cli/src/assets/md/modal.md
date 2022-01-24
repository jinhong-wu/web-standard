**文件：tip.service.ts**（common/service/tip/tip.service.ts）

# 顶部居中提示

**页面效果：**
![image-1](assets/md/imgs/tip-msg.png)

**使用：前端提示**
- type：info、success、warning、error、loading  
```typescript
// msg(type, content)
this.tip.msg("loading", "正在下载");
```

# 右下角通知框

**页面效果：**
![image-1](assets/md/imgs/tip-notify.png)

**使用：后端接口调用的提示**
- type：info、success、warning、error、blank
- title：  
（type = 'success'）createSuccess、updateSuccess、deleteSuccess、importSuccess、exportSuccess、saveSuccess  
（type = 'error'）createError、updateError、deleteError、importError、exportError、saveError  
```typescript
// notify(type, title, content)
this.tip.notify("success", "提示标题", "提示内容");
```

# 确认对话框

**页面效果：**
![image-1](assets/md/imgs/tip-confirm.png)

**使用：确认操作**
- 按钮顺序：确定、取消
- type：info、success、warning、error、blank
- title：  
（type = 'success'）createSuccess、updateSuccess、deleteSuccess、importSuccess、exportSuccess、saveSuccess  
（type = 'error'）createError、updateError、deleteError、importError、exportError、saveError  
```typescript
// confirm(content, okFn)
this.tip.confirm("确定删除所选表格数据？", ()=>{
	// 确认后代码...
});
```

# 基本对话框

**页面效果：**
![image-1](assets/md/imgs/tip-modal.png)

**使用：弹框页**
- 按钮顺序：拨测、保存、重置、取消（tab页form按钮顺序）
```typescript
const modal = this.nzModal.create({
	...this.tip.modal(),  // 统一配置
	nzTitle: '标题',
	nzContent: ModalCreateComponent,
	nzWidth: 800,
	nzComponentParams: {
		// 传递数据
	},
});
// 支持拖拽
this.tip.modalAfter(modal, {
	close(res) {
		// 关闭后代码...
	}
});
```
- 弹出框nzContent统一要求（ModalCreateComponent）
```html
<!-- public nzModal: NzModalRef -->
<nz-spin [nzSpinning]="formLoading">
	<div class="content">
		// 内容
	</div>
	<div class="footer">
		// 按钮（测试、保存、重置、取消...）
		<button nz-button nzType="default" (click)="nzModal.close()">取消</button>
	</div>
</nz-spin>
```

		


