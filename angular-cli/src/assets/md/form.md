**文件：**
- 全局属性：BaseTs（common/ts/base/base.ts）
- 表格属性&方法：FormBaseTs（common/ts/base/form.base.ts）

# 全部用法
示例文件：app-menu-create（pages/public/menu/menu-create/menu-create.component.ts）
```html
<!-- tab：对应tab值，tabIndex：对应tab序号，必传，search：对应表格查询函数，必传 -->
<app-menu-create [tab]="tab" [tabIndex]="index" (search)="tableDataFn($event)"></app-menu-create>

<nz-spin [nzSpinning]="formLoading">
	<div class="form-content">
		<form nz-form [formGroup]="form">
			<nz-form-item>
				<nz-form-label nzSpan="6" nzRequired>用户名</nz-form-label>
				<nz-form-control nzSpan="12" nzHasFeedback [nzErrorTip]="requiredErrorTpl">
					<input nz-input formControlName="username" autocomplete="username">
				</nz-form-control>
				<nz-form-control nzSpan="1">
					<i nz-icon nzType="info-circle" class="i-tip" [nz-tooltip]="'用户名填写规则'"></i>
				</nz-form-control>
			</nz-form-item>
			<nz-form-item>
				<nz-form-label nzSpan="6" nzRequired>地址</nz-form-label>
				<nz-form-control nzSpan="12" nzHasFeedback [nzErrorTip]="requiredErrorTpl">
					<input nz-input formControlName="address" autocomplete="address">
				</nz-form-control>
			</nz-form-item>
			<nz-form-item>
				<nz-form-label nzSpan="6" nzRequired>描述</nz-form-label>
				<nz-form-control nzSpan="12" nzHasFeedback [nzErrorTip]="requiredErrorTpl">
					<input nz-input formControlName="describe" autocomplete="describe">
				</nz-form-control>
			</nz-form-item>
		</form>
	</div>
	<div class="form-footer">
		<button nz-button nzType="primary" (click)="test()">拨测</button>
		<button nz-button nzType="primary" (click)="save()">保存</button>
		<button nz-button nzType="default" (click)="reset()">重置</button>
		<button nz-button nzType="default" (click)="cancel()">取消</button>
	</div>
</nz-spin>
<ng-template #requiredErrorTpl let-control>
	<ng-container *ngIf="control.hasError('required')">
		必须输入
	</ng-container>
</ng-template>
```
```typescript
import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBaseTs } from 'src/app/common/ts/base/form.base';

@Component({
  selector: 'app-menu-create',
  templateUrl: './menu-create.component.html',
  styleUrls: ['./menu-create.component.less']
})
export class MenuCreateComponent extends FormBaseTs implements OnInit {

  constructor(
		public injuctor: Injector,
	) { 
		super(injuctor);
	}
	
  ngOnInit() {
    this.form = this.fb.group({
      username: [{ value: null, disabled: this.tab?.data?.username }, [Validators.required]],
      address: [null, [Validators.required]],
      describe: [null, [Validators.required]],
    });
		this.reset(false);
  }

	test() {
		this.saveInit(() => {
			// 拨测代码
			console.log("拨测");
		});
	}

	save() {
		this.saveInit(() => {
			this.formInit();
			setTimeout(()=>{
				this.formLoading = false;
				this.tip.notify('success', "新增成功");
				this.cancel(true);
			}, 1000)
		});

	}

  reset(confirm?) {
    this.resetInit(() => {
      this.form.patchValue({
				username: this.tab?.data?.username,
				address: this.tab?.data?.address,
				describe: this.tab?.data?.describe,
			});
    }, confirm);
  }

}
```