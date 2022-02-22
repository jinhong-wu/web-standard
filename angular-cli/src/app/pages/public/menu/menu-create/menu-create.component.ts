import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBaseTs } from 'src/app/common/ts/base/form.base';

@Component({
  selector: 'app-menu-create',
  templateUrl: './menu-create.component.html',
  styleUrls: ['./menu-create.component.less'],
})
export class MenuCreateComponent extends FormBaseTs implements OnInit {
  constructor(public injuctor: Injector) {
    super(injuctor);
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: [
        { value: null, disabled: this.tab?.data?.username },
        [Validators.required],
      ],
      address: [null, [Validators.required]],
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
        this.tip.notify('success', '新增成功');
        this.cancel(true);
      }, 1000);
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
