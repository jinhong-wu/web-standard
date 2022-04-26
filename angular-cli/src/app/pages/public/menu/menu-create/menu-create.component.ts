import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/common/service/validator.service';
import { FormBaseTs } from 'src/app/common/ts/base/form.base';

@Component({
  selector: 'app-menu-create',
  templateUrl: './menu-create.component.html',
  styleUrls: ['./menu-create.component.less'],
})
export class MenuCreateComponent extends FormBaseTs implements OnInit {
  constructor(public injuctor: Injector, public validator: ValidatorService) {
    super(injuctor);
  }

  ngOnInit() {
    this.form = this.fb.group({
      ip: [
        { value: null, disabled: this.tab.type == 'update' },
        [Validators.required, Validators.pattern(this.validator.IPV4)],
      ],
			init: [null, [Validators.required]],
      describe: [null, [Validators.pattern(this.validator.DESCRIPTION)]],
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
				this.tip.successNotify(this.tab.type);
        this.cancel(true);
      }, 1000);
    });
  }

  reset(confirm?) {
    this.resetInit(() => {
      this.form.patchValue({
        ip: this.tab?.data?.ip || null,
				init: this.tab?.data?.init || 'nothing',
        describe: this.tab?.data?.describe,
      });
    }, confirm);
  }
}
