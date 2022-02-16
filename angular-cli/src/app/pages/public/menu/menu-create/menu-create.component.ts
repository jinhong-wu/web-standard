import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseFormTs } from 'src/app/common/ts/base/form.base';

@Component({
  selector: 'app-menu-create',
  templateUrl: './menu-create.component.html',
  styleUrls: ['./menu-create.component.less'],
})
export class MenuCreateComponent extends BaseFormTs implements OnInit {
  constructor(public injuctor: Injector) {
    super(injuctor);
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: [
        { value: this.tab?.data?.username, disabled: this.tab?.data?.username },
        [Validators.required],
      ],
      address: [this.tab?.data?.address, [Validators.required]],
      describe: [this.tab?.data?.describe, [Validators.required]],
    });
  }

  test() {
    this.saveInit(() => {
      // 拨测代码
      console.log('拨测');
    });
  }

  save() {
    this.saveInit(() => {
      this.formInit(this.formValuesFn());
      setTimeout(() => {
        this.formLoading = false;
        this.tip.notify('success', '新增成功');
        this.cancel(true);
      }, 1000);
    });
  }

  reset() {
    this.resetInit(() => {
      this.form.patchValue({
        username: this.tab?.data?.username,
        address: this.tab?.data?.address,
        describe: this.tab?.data?.describe,
      });
    });
  }
}
