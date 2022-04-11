# 注意！！！
- form表单中：formControlName和ngModel尽量避免混用（容易造成很多Bug）

**文件：**
- 全局属性：BaseTs（common/ts/base/base.ts）
- 表格属性&方法：FormBaseTs（common/ts/base/form.base.ts）

# 全部用法
示例文件：app-menu-create（pages/public/menu/menu-create/menu-create.component.ts）
```html
<nz-spin [nzSpinning]="formLoading">
	<div class="form-content">
		<form nz-form [formGroup]="form">
			<nz-form-item>
				<nz-form-label nzSpan="6" nzRequired>Select 下拉框</nz-form-label>
				<nz-form-control nzSpan="12">
					参考 公共示例-Select 下拉框
				</nz-form-control>
			</nz-form-item>
			<nz-form-item>
				<nz-form-label nzSpan="6" nzRequired>IP</nz-form-label>
				<nz-form-control nzSpan="12" nzHasFeedback [nzErrorTip]="requiredErrorTpl">
					<input nz-input formControlName="ip" autocomplete="ip">
				</nz-form-control>
				<nz-form-control nzSpan="1">
					<i nz-icon nzType="info-circle" class="i-tip" [nz-tooltip]="'填写正确的IP值'"></i>
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
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less'],
})
export class FormComponent extends FormBaseTs implements OnInit {
  constructor(public injuctor: Injector) {
    super(injuctor);
  }

  ngOnInit() {
    this.form = this.fb.group({
      ip: [
        { value: null, disabled: this.tab.type == 'update' },
        [Validators.required],
      ],
      describe: [null, [Validators.required]],
    });
    this.reset(false);
  }

  test() {
    this.saveInit(() => {
      // 拨测代码
      console.log('拨测');
    });
  }

  save() {
    this.saveInit(() => {
      this.formInit();
      setTimeout(() => {
        this.formLoading = false;
        this.tip.notify(
          'success',
          this.tab.type == 'update' ? '修改成功' : '新增成功'
        );
        this.cancel(true);
      }, 1000);
    });
  }

  reset(confirm?) {
    this.resetInit(() => {
      this.form.patchValue({
        ip: this.tab?.data?.ip,
        describe: this.tab?.data?.describe,
      });
    }, confirm);
  }
}
```