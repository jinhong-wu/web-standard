**文件：tip.service.ts**（common/service/tip.service.ts）

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
  
	（type = 'success'）this.tip.successNotify()
	（type = 'error'）this.tip.errorNotify()
```typescript
this.tip.notify(type, "提示标题", "提示内容");
```

# 确认对话框

**页面效果：**
![image-1](assets/md/imgs/tip-confirm.png)

**使用：确认操作**
- 提示语句：是否/确定xxx？
  ```html
	例：是否删除所选xxx？、是否导出所选xxx？、是否导出所有查询结果？
	特殊删除提示框：删除xxx会导致xxx，确定是否删除？
	```
- 按钮顺序：确定、取消
```typescript
this.tip.confirm("确定xxxx？", ()=>{
	// 确认后代码...
});
```

# 基本对话框

**页面效果：**
![image-1](assets/md/imgs/tip-modal.png)

**使用：弹框页**
- 除特殊要求外，都需要支持拖动功能
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
<!-- 弹出框：nz-spin加载效果（必须） -->
<nz-spin [nzSpinning]="formLoading">
	<div class="content">
		内容
	</div>
	<div class="footer">
		<!--按钮顺序：拨测、保存、重置、取消...-->
		<button nz-button nzType="primary" (click)="test()">拨测</button>
		<button nz-button nzType="primary" (click)="saveFn()">保存</button>
		<button nz-button nzType="primary" nzGhost (click)="resetFn()">重置</button>
		<!-- public nzModalRef: NzModalRef -->
		<button nz-button nzType="default" (click)="nzModalRef.close()">取消</button>
	</div>
</nz-spin>
```

		


