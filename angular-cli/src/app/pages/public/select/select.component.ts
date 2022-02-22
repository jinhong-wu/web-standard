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
      tags: [{ value: null, disabled: false }, [Validators.required]],
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
