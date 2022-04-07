# 全部用法
```html
<nz-spin [nzSpinning]="formLoading">
	<div class="form-content">
		<form nz-form [formGroup]="form">
			<nz-form-item>
				<nz-form-label nzSpan="6" nzRequired>select-单选</nz-form-label>
				<nz-form-control nzSpan="12" nzHasFeedback [nzErrorTip]="requiredErrorTpl">
					<nz-select nzShowSearch nzAllowClear formControlName="select">
						<nz-option nzLabel="a10" nzValue="a10"></nz-option>
						<nz-option nzLabel="c12" nzValue="c12"></nz-option>
					</nz-select>
				</nz-form-control>
			</nz-form-item>
			<nz-form-item>
				<nz-form-label nzSpan="6" nzRequired>select-多选</nz-form-label>
				<nz-form-control nzSpan="12" nzHasFeedback [nzErrorTip]="requiredErrorTpl">
					<nz-select nzShowSearch nzAllowClear nzMode="multiple" formControlName="multiple">
						<nz-option nzLabel="a10" nzValue="a10"></nz-option>
						<nz-option nzLabel="c12" nzValue="c12"></nz-option>
					</nz-select>
				</nz-form-control>
			</nz-form-item>
			<nz-form-item>
				<nz-form-label nzSpan="6" nzRequired>select-自行输入多个内容</nz-form-label>
				<nz-form-control nzSpan="12" nzHasFeedback [nzErrorTip]="requiredErrorTpl">
					<nz-select nzAllowClear nzMode="tags" formControlName="tags" nzNotFoundContent="多个内容以【回车】分隔"></nz-select>
				</nz-form-control>
			</nz-form-item>
			<nz-form-item>
				<nz-form-label nzSpan="6" nzRequired>select-点击出现表格弹出框</nz-form-label>
				<nz-form-control nzSpan="12" nzHasFeedback [nzErrorTip]="requiredErrorTpl">
					<app-select-modal #selectModal formControlName="modal" (openChange)="openChange()">
					</app-select-modal>
				</nz-form-control>
			</nz-form-item>
		</form>
	</div>
	<div class="form-footer">
		<button nz-button nzType="primary" (click)="save()">保存</button>
		<button nz-button nzType="primary" (click)="reset()">重置</button>
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
import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBaseTs } from 'src/app/common/ts/base/form.base';
import { SelectOpenComponent } from './select-open/select-open.component';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less'],
})
export class SelectComponent extends FormBaseTs implements OnInit {
  constructor(public injuctor: Injector) {
    super(injuctor);
  }

  @ViewChild('selectModal', { static: false }) selectModal;

  tab = {
    data: {
      select: 'a10',
      multiple: ['a10', 'c12'],
      tags: ['a10', 'c12'],
      modal: [
        { value: '2', label: 'label2' },
        { value: '3', label: 'label3' },
      ],
    },
  };

  ngOnInit() {
    this.form = this.fb.group({
      select: [null, [Validators.required]],
      multiple: [null, [Validators.required]],
      tags: [{ value: null, disabled: true }, [Validators.required]],
      modal: [null, [Validators.required]],
    });
    this.reset(false);
  }

  save() {
    this.saveInit(() => {
      this.formInit();
      this.formParams.modal = this.formParams.modal.map((item) => item.value);
      setTimeout(() => {
        this.formLoading = false;
        this.tip.notify('success', '新增成功');
        this.cancel(true);
      }, 1000);
    });
  }

  reset(confirm?) {
    this.resetInit(() => {
      this.form.patchValue({
        select: this.tab?.data?.select,
        multiple: this.tab?.data?.multiple,
        tags: this.tab?.data?.tags,
        modal: this.tab?.data?.modal,
      });
    }, confirm);
  }

  openChange() {
    this.selectModal.openModal({
      nzTitle: '标题',
      nzContent: SelectOpenComponent,
      nzWidth: 1000,
      nzComponentParams: {
        checkedRows: this.selectModal.selectRows,
      },
    });
  }
}
```

# select-自行输入多个内容

**页面效果：**
![image-1](assets/md/imgs/select-tag-multiple.png)

**使用：**
```html
<nz-select nzMode="tags" nzAllowClear nzNotFoundContent="多个内容以【回车】分隔"></nz-select>
```

# select-点击出现表格弹出框
**文件：** SelectModalComponent（common/component/select-modal/select-modal.component.ts）   

**使用-参数：**
- openChange：弹出框-打开表格页面方法，必传
- multiple：弹出框-表格页面-是否多选，默认true多选
- maxCount：select-展示的最大tag数，默认4
- disabled：select-是否禁止选中，默认false
- placeholder：select-默认文字

```html
<!-- #selectModal 必须取名，formControlName 必须命名 -->
<app-select-modal #selectModal formControlName="modal" (openChange)="openChange()"></app-select-modal>
```

```typescript
@ViewChild('selectModal', { static: false }) selectModal;

save() {
	this.saveInit(() => {
		this.formInit();
		this.formParams.modal = this.formParams.modal.map((item) => item.value);
		// 其他操作
	});
}
openChange() {
	this.selectModal.openModal({
		nzTitle: '标题',
		nzContent: SelectOpenComponent,
		nzWidth: 1000,
		nzComponentParams: {
			checkedRows: this.selectModal.selectRows,
		},
	});
}

// SelectOpenComponent保存方法
save() {
	this.checkedIdsFn();
	this.NzModalRef.close({
		value: this.checkedIds,
		option: this.checkedData,
	});
}
```

