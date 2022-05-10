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
    this.reset(false);
  }

  save() {
    this.saveInit(() => {
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

  reset(confirm?) {
    this.resetInit(() => {
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
