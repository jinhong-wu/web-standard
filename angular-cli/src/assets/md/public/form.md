# 必读！！！
- 表单统一要求
```html
<!-- 表单：nz-spin加载效果（必须） -->
<nz-spin [nzSpinning]="formLoading">
	<div class="form-content">
      <form nz-form [formGroup]="form">
				<nz-form-item>
					<!-- 所有label均[nz-tooltip]（BUG编号24136）、此写法多余文字还能显示省略号 -->
					<nz-form-label nzSpan="6" nzRequired>
						<span [nz-tooltip]=""></span>
					</nz-form-label>
					<nz-form-control nzSpan="12"></nz-form-control>
				</nz-form-item>
      </form>
	</div>
	<div class="form-footer">
		<!--按钮顺序：拨测、保存、重置、取消...-->
		<button nz-button nzType="primary" (click)="test()">拨测</button>
		<button nz-button nzType="primary" (click)="saveFn()">保存</button>
		<button nz-button nzType="primary" nzGhost (click)="resetFn()">重置</button>
		<button nz-button nzType="default" (click)="cancel()">取消</button>
	</div>
</nz-spin>
```
- form表单中：formControlName和ngModel尽量避免混用（容易造成很多Bug）
- 重置方法reset()：必须写上 || null，表示新增无数据传入时，输入框等的默认值
- 当下拉框只有2~3个等固定情况下，用radio或checkbox，更直观，不用下拉列表
- 单选框必须要有默认值
- 提示统一为（BUG编号24804）  
  有具体规则提示：请输入合法的xxx，且尾部蓝色icon说明具体规则  
	无具体规则提示：请输入xxx、请选择xxx（不提示：必须输入xxx、xxx不能为空）
```html
<app-form-control-info [tooltip]=""></app-form-control-info>
<!-- 尾部蓝色icon说明-组件：app-form-control-info -->
<nz-form-control nzSpan="1">
	<i nz-icon nzType="info-circle" [nz-tooltip]=""></i>
</nz-form-control>
```
- 端口使用nz-input-number（所有的端口号都不能为小数）
```html
<nz-input-number [nzMin]="1" [nzMax]="65535" [nzPrecision]='0' formControlName='' nzPlaceHolder="端口">
</nz-input-number>
```
- input等长度限制，使用maxlength，不使用validator


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
				<nz-form-label nzSpan="6" nzRequired>
					<span [nz-tooltip]="'Select 下拉框'">Select 下拉框</span>
				</nz-form-label>
				<nz-form-control nzSpan="12">
					参考 公共示例-Select 下拉框
				</nz-form-control>
			</nz-form-item>
			<nz-form-item>
				<nz-form-label nzSpan="6" nzRequired>
					<span [nz-tooltip]="'IP'">IP</span>
				</nz-form-label>
				<nz-form-control nzSpan="12" nzHasFeedback [nzErrorTip]="i18n.list.formTip.legal+'IPV4'">
					<input nz-input formControlName="ip" placeHolder="默认只支持IPV4">
				</nz-form-control>
				<app-form-control-info [tooltip]="i18n.list.pattern.ipv4"></app-form-control-info>
			</nz-form-item>
			<nz-form-item>
				<nz-form-label nzSpan="6" nzRequired>
					<span [nz-tooltip]="'描述'">描述</span>
				</nz-form-label>
				<nz-form-control nzSpan="12" nzHasFeedback [nzErrorTip]="i18n.list.formTip.input+'描述'">
					<input nz-input formControlName="describe" placeHolder="描述">
				</nz-form-control>
				<app-form-control-info [tooltip]="i18n.list.pattern.description"></app-form-control-info>
			</nz-form-item>
			<nz-form-item>
				<nz-form-label nzSpan="6" nzRequired>
					<span [nz-tooltip]="'单选框'">单选框</span>
				</nz-form-label>
				<nz-form-control nzSpan="12" nzHasFeedback>
					<nz-radio-group formControlName="init">
						<label nz-radio nzValue="nothing">初始值为空</label>
						<label nz-radio nzValue="init">单选框必须有初始值</label>
					</nz-radio-group>
				</nz-form-control>
			</nz-form-item>
			<nz-form-item>
				<nz-form-control nzOffset="6" nzSpan="12">
					<nz-alert nzShowIcon nzType="info" nzMessage="表单提示：统一放在输入框下，按钮上。"></nz-alert>
				</nz-form-control>
			</nz-form-item>
		</form>
	</div>
	<div class="form-footer">
		<button nz-button nzType="primary" (click)="test()">拨测</button>
		<button nz-button nzType="primary" (click)="saveFn()">保存</button>
		<button nz-button nzType="primary" nzGhost (click)="resetFn()">重置</button>
		<button nz-button nzType="default" (click)="cancel()">取消</button>
	</div>
</nz-spin>
```

```typescript
import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { TableService } from 'src/app/common/api/public/table/table.service';
import { FormBaseTs } from 'src/app/common/ts/base/form.base';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less'],
})
export class FormComponent extends FormBaseTs implements OnInit {
  constructor(
		public injuctor: Injector,
		public TableService: TableService
	) {
    super(injuctor);
  }

  ngOnInit() {
    this.form = this.fb.group({
      ip: [
        { value: null, disabled: this.tab.type == 'update' },
        [Validators.required, Validators.pattern(this.pattern.IPV4)],
      ],
      init: [null, [Validators.required]],
      describe: [null, [Validators.required]],
    });
    this.resetFn(false);
  }

  test() {
    this.save({
			paramsFn() {

			}, 
			formService: this.TableService,
			saveApi: 'test', 
			successFn(res) {
				console.log('test成功');
			},
			errorFn() {
				console.log('test失败');
			}
		});
  }

  saveFn() {
		this.save({
			paramsFn() {

			}, 
			formService: this.TableService,
			saveApi: 'create', 
			successFn(res) {
				console.log('create成功');
			},
			errorFn() {
				console.log('create失败');
			}
		});
  }

  resetFn(confirm?) {
    this.reset(confirm, () => {
      this.form.patchValue({
        ip: this.tab?.data?.ip || null,
        init: this.tab?.data?.init || 'init',
        describe: this.tab?.data?.describe,
      });
    });
  }
}
```