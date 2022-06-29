import { EventEmitter, Injector, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PatternService } from '../../service/pattern.service';
import { BaseTs } from './base';
/**
 * @name 表单-基本属性及方法
 * @param search 数据刷新对应函数，必传
 */
 interface saveInit {
  formService: any;  // form-api所在service
  saveApi: string; // form-api所在service-方法名
  paramsFn?: Function;  // 请求参数回调函数
  successFn?: Function; // 请求成功回调函数
  errorFn?: Function;  // 请求失败回调函数
	notify?: string; // 提示框内容
}
export class FormBaseTs extends BaseTs {
  public fb;
	public pattern;
  constructor(public injector: Injector) {
    super(injector);
		this.fb = injector.get(FormBuilder);
		this.pattern = injector.get(PatternService);
  }

  @Output() search = new EventEmitter<boolean>();

  form: FormGroup;
  formLoading: boolean = false;
  formParams: any = {};

  // 获取表单所有value（这样注册[{value: false}]，this.form.value无法全部获取）
  formValuesFn(fn?: Function) {
    this.formParams = {};
    Object.keys(this.form.controls).forEach((key) => {
      this.formParams[key] = this.form.controls[key].value;
    });
		fn?.call(this);
  }

  // 保存
  save({ paramsFn, formService, saveApi, successFn, errorFn, notify = this.MenuService?.tab?.type }: saveInit) {
    // 更新验证规则，统一写在前面（valid更改时会出现验证规则更新不及时的bug）
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    if (this.form.valid) {
			this.formValuesFn(paramsFn);
			this.formLoading = true;
      formService[saveApi].call(formService, this.HttpUtilTs.paramsFn(this.formParams)).subscribe((res) => {
				this.formLoading = false;
				if (res.code == 0) {
					this.tip.successNotify(notify);
					this.cancel(true);
					successFn?.call(this, res);
				} else {
					this.tip.errorNotify(notify);
					errorFn?.call(this);
				}
      }, () => {
        this.formLoading = false;
        errorFn?.call(this);
      });
    }
  }

  // 重置时confirm提示
  reset(confirm = true, okFn: Function) {
    if (confirm) {
      this.tip.confirm(this.i18n.baseList.resetConfirm, okFn);
    } else {
      okFn();
    }
  }

  // 取消时是否刷新数据
  cancel(refresh = false) {
    this.MenuService.closeTab(this.MenuService.tab);
    this.search.emit(refresh);
  }
}
