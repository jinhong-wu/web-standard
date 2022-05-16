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
      init: [null, [Validators.required]],
      describe: [null, [Validators.required]],
    });
    this.resetFn(false);
  }

  test() {
    this.save(() => {
      // 拨测代码
      console.log('拨测');
    });
  }

  saveFn() {
    this.save(() => {
      this.formInit();
      setTimeout(() => {
        this.formLoading = false;
        this.tip.successNotify(this.tab.type);
        this.cancel(true);
      }, 1000);
    });
  }

  resetFn(confirm?) {
    this.reset(() => {
      this.form.patchValue({
        ip: this.tab?.data?.ip || null,
        init: this.tab?.data?.init || 'nothing',
        describe: this.tab?.data?.describe,
      });
    }, confirm);
  }
}
