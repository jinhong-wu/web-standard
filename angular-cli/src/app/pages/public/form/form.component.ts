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
        { value: null, disabled: this.MenuService.tab.type == 'update' },
        [Validators.required, Validators.pattern(this.pattern.IPV4)],
      ],
      init: [null, [Validators.required]],
      describe: [null, [Validators.required]],
    });
    this.resetFn(false);
  }

  test() {
    this.save({
			notify: 'test',
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
        ip: this.MenuService.tab?.data?.ip || null,
        init: this.MenuService.tab?.data?.init || 'init',
        describe: this.MenuService.tab?.data?.describe,
      });
    });
  }
}
