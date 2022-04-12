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

  nodes = [
    {
      title: 'parent 1',
      key: '1',
      children: [
        {
          title: 'parent 1-0',
          key: '1-0',
          children: [{ title: 'leaf 1-0-0', key: '1-0-0', isLeaf: true }],
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
      treeMultiple: ['1-0', '1-1'],
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
      tree: [null, [Validators.required]],
      treeMultiple: [null, [Validators.required]],
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
        tree: this.tab?.data?.tree,
        treeMultiple: this.tab?.data?.treeMultiple,
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
