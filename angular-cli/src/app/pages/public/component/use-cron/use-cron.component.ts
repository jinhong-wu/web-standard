import { AfterViewInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBaseTs } from 'src/app/common/ts/base/form.base';

@Component({
  selector: 'app-use-cron',
  templateUrl: './use-cron.component.html',
  styleUrls: ['./use-cron.component.less']
})
export class UseCronComponent extends FormBaseTs implements OnInit, AfterViewInit {
  constructor(public injuctor: Injector) {
    super(injuctor);
  }

	@ViewChild('cron', { static: false }) cron;

  tab = {
    data: {
      use: '组件app-corn',
			trigger: "29 58 16 ? * 3"
    },
  };

  ngOnInit() {
    this.form = this.fb.group({
			// 其他表单元素
		});
  }

	// 必须在ngAfterViewInit函数中执行resetFn()
	ngAfterViewInit() {
		this.resetFn(false);
	}

  saveFn() {
		this.cron.saveFn(this.form, (cron) => {
			console.log(cron);
			// 保存操作
    });
  }

  resetFn(confirm?) {
		this.cron.resetFn(confirm, () => {
      this.form.patchValue({
        // 其他表单元素
      });
    });
  }
}
