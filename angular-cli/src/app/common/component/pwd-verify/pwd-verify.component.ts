import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { I18nService } from '../../service/system/i18n.service';
/**
 * @name 密码验证
 * @example
		this.TipModalService.verify(()=>{
			// 验证成功后...
		});
*/
@Component({
  selector: 'app-pwd-verify',
  templateUrl: './pwd-verify.component.html',
  styleUrls: ['./pwd-verify.component.less']
})
export class PwdVerifyComponent implements OnInit {

  constructor(
		public nzModalRef: NzModalRef,
		public fb: FormBuilder, 
		private i18n: I18nService
	) { }

	form: FormGroup;
	formLoading = false;

  ngOnInit(): void {
		this.form = this.fb.group({
      pwd: [null, [Validators.required]]
    });
  }

	save() {
		for (const i in this.form.controls) {
			this.form.controls[i].markAsDirty();
			this.form.controls[i].updateValueAndValidity();
		}
		if (this.form.valid) {
			//this.formLoading = true;
			// API请求，验证成功执行this.nzModalRef.close(true);
			//this.formLoading = false;
			this.nzModalRef.close(true);
		}
	}

}
