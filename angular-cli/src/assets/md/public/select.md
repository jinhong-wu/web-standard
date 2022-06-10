# 必读！！！
- 所有select都需要nzPlaceHolder
- nz-select必须配置nzShowSearch、nzAllowClear、nzDropdownMatchSelectWidth（除非特殊要求）
  ```html
	<!-- 
		nzShowSearch：可搜索
		nzAllowClear：显示清除按钮
		nzDropdownMatchSelectWidth：默认最小宽度为选择器宽度，超出后自适应宽度。  
	-->
	<nz-select nzShowSearch nzAllowClear nzDropdownMatchSelectWidth nzPlaceHolder="">
		<nz-option nzValue="" nzLabel=""></nz-option>
	</nz-select>
	```

# 全部用法
```html
<nz-spin [nzSpinning]="formLoading">
	<div class="form-content">
		<form nz-form [formGroup]="form">
			<nz-form-item>
				<nz-form-label nzSpan="6" nzRequired>
					<span [nz-tooltip]="'select-单选'">select-单选</span>
				</nz-form-label>
				<nz-form-control nzSpan="12" nzHasFeedback [nzErrorTip]="i18n.list.formTip.select+'xxx'">
					<nz-select nzShowSearch nzAllowClear nzDropdownMatchSelectWidth formControlName="select"
						nzPlaceHolder="select-单选">
						<nz-option nzLabel="a10" nzValue="a10"></nz-option>
						<nz-option nzLabel="c12" nzValue="c12"></nz-option>
					</nz-select>
				</nz-form-control>
			</nz-form-item>
			<nz-form-item>
				<nz-form-label nzSpan="6" nzRequired>
					<span [nz-tooltip]="'select-多选'">select-多选</span>
				</nz-form-label>
				<nz-form-control nzSpan="12" nzHasFeedback [nzErrorTip]="i18n.list.formTip.select+'xxx'">
					<nz-select nzShowSearch nzAllowClear nzDropdownMatchSelectWidth nzMode="multiple" formControlName="multiple"
						nzPlaceHolder="select-多选">
						<nz-option nzLabel="a10" nzValue="a10"></nz-option>
						<nz-option nzLabel="c12" nzValue="c12"></nz-option>
					</nz-select>
				</nz-form-control>
			</nz-form-item>
			<nz-form-item>
				<nz-form-label nzSpan="6" nzRequired>
					<span [nz-tooltip]="'select-树-单选'">select-树-单选</span>
				</nz-form-label>
				<nz-form-control nzSpan="12" nzHasFeedback [nzErrorTip]="i18n.list.formTip.select+'xxx'">
					<nz-tree-select nzShowSearch nzAllowClear nzHideUnMatched nzDropdownMatchSelectWidth [nzNodes]="nodes"
						nzPlaceHolder="select-树-单选" formControlName="tree">
					</nz-tree-select>
				</nz-form-control>
			</nz-form-item>
			<nz-form-item>
				<nz-form-label nzSpan="6" nzRequired>
					<span [nz-tooltip]="'select-树-多选'">select-树-多选</span>
				</nz-form-label>
				<nz-form-control nzSpan="12" nzHasFeedback [nzErrorTip]="i18n.list.formTip.select+'xxx'">
					<nz-tree-select nzShowSearch nzAllowClear nzHideUnMatched nzDropdownMatchSelectWidth nzCheckable
						[nzNodes]="nodes" nzPlaceHolder="select-树-多选" formControlName="treeMultiple">
					</nz-tree-select>
				</nz-form-control>
			</nz-form-item>
			<nz-form-item>
				<nz-form-label nzSpan="6" nzRequired>
					<span [nz-tooltip]="'input-自行输入多个内容'">input-自行输入多个内容</span>
				</nz-form-label>
				<nz-form-control nzSpan="12" nzHasFeedback [nzErrorTip]="i18n.list.formTip.input+'xxx'">
					<input nz-input formControlName='input' placeholder="多个内容以【英文逗号】分隔">
				</nz-form-control>
				<app-form-control-info [tooltip]="i18n.baseList.inputMultiple"></app-form-control-info>
			</nz-form-item>
			<nz-form-item>
				<nz-form-label nzSpan="6" nzRequired>
					<span [nz-tooltip]="'select-点击出现表格弹出框-单选'">select-点击出现表格弹出框-单选</span>
				</nz-form-label>
				<nz-form-control nzSpan="12" nzHasFeedback [nzErrorTip]="i18n.list.formTip.select+'xxx'">
					<app-select-modal #selectModal formControlName="modal" [nzPlaceHolder]="'select-点击出现表格弹出框-单选'"
						(openChange)="openChange()" multiple [value]="'id'" [label]="'name'">
					</app-select-modal>
				</nz-form-control>
			</nz-form-item>
			<nz-form-item>
				<nz-form-label nzSpan="6" nzRequired>
					<span [nz-tooltip]="'select-点击出现表格弹出框-多选'">select-点击出现表格弹出框-多选</span>
				</nz-form-label>
				<nz-form-control nzSpan="12" nzHasFeedback [nzErrorTip]="i18n.list.formTip.select+'xxx'">
					<app-select-modal #selectModalMultiple formControlName="modalMultiple" [nzPlaceHolder]="'select-点击出现表格弹出框-多选'"
						(openChange)="openChangeMultiple()" [value]="'id'" [label]="'name'">
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
  @ViewChild('selectModalMultiple', { static: false }) selectModalMultiple;

  nodes = [
    {
      title: 'parent 1',
      key: '1',
      children: [
        {
          title: 'parent 1-0',
          key: '1-0',
          children: [
						{ title: 'leaf 1-0-0', key: '1-0-0', isLeaf: true },
						{ title: 'leaf 1-0-1', key: '1-0-1', isLeaf: true }
					],
        },
        {
          title: 'parent 1-1',
          key: '1-1',
          children: [{ title: 'leaf 1-1-0', key: '1-1-0', isLeaf: true }],
        },
      ],
    },
  ];
  tab = {
    data: {
      select: 'a10',
      multiple: ['a10', 'c12'],
      tree: '1-0',
      treeMultiple: ['1-0-1', '1-1-0'],
      input: ['a10', 'c12'],
      modal: [
        { id: '2', name: 'name2' },
      ],
      modalMultiple: [
        { id: '2', name: 'name2' },
        { id: '3', name: 'name3' },
      ],
    },
  };

  ngOnInit() {
    this.form = this.fb.group({
      select: [null, [Validators.required]],
      multiple: [null, [Validators.required]],
      tree: [null, [Validators.required]],
      treeMultiple: [null, [Validators.required]],
      input: [{ value: null, disabled: false }, [Validators.required]],
      modal: [null, [Validators.required]],
      modalMultiple: [null, [Validators.required]],
    });
    this.resetFn(false);
  }

  saveFn() {
    this.save(() => {
      this.formInit();
      this.formParams.modal = this.formParams.modal.map((item) => item.id);
      this.formParams.modalMultiple = this.formParams.modalMultiple.map((item) => item.id);
      setTimeout(() => {
        this.formLoading = false;
        this.tip.successNotify('create');
        this.cancel(true);
      }, 1000);
    });
  }

  resetFn(confirm?) {
    this.reset(() => {
      this.form.patchValue({
        select: this.tab?.data?.select,
        multiple: this.tab?.data?.multiple,
        tree: this.tab?.data?.tree,
        treeMultiple: this.tab?.data?.treeMultiple,
        input: this.tab?.data?.input,
        modal: this.tab?.data?.modal,
        modalMultiple: this.tab?.data?.modalMultiple,
      });
    }, confirm);
  }

  openChange() {
    this.selectModal.openModal({
      nzTitle: 'select-表格弹出框-单选',
      nzContent: SelectOpenComponent,
      nzWidth: 1000,
      nzComponentParams: {
        multiple: false,
        checkedRows: this.selectModal.selectRows,
      },
    });
  }

  openChangeMultiple() {
    this.selectModalMultiple.openModal({
      nzTitle: 'select-表格弹出框-多选',
      nzContent: SelectOpenComponent,
      nzWidth: 1000,
      nzComponentParams: {
        checkedRows: this.selectModalMultiple.selectRows,
      },
    });
  }
}
```

<!--# select-自行输入多个内容

**页面效果：**
![image-1](assets/md/imgs/select-tag-multiple.png)

**使用：**
```html
<nz-select nzShowSearch nzAllowClear nzDropdownMatchSelectWidth nzMode="tags" nzNotFoundContent="多个内容以【回车】分隔"></nz-select>
```-->

# select-点击出现表格弹出框
**文件：** SelectModalComponent（common/component/select-modal/select-modal.component.ts）   

**使用-参数：**
- openChange：弹出框-打开表格页面方法，必传
- multiple：弹出框-表格页面-是否多选，默认true多选
- maxCount：select-展示的最大tag数，默认4
- disabled：select-是否禁止选中，默认false
- nzPlaceHolder：select-默认文字
- value：select-对应value字段，默认'value'
- label select-对应label字段，默认'label'
	```html
	<!-- #selectModal 必须取名，formControlName 必须命名 -->
	<app-select-modal #selectModal formControlName="modal" [nzPlaceHolder]="" (openChange)="openChange()"></app-select-modal>
	```

	```typescript
	@ViewChild('selectModal', { static: false }) selectModal;

	saveFn() {
		this.save(() => {
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

