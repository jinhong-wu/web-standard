import { EventEmitter, Injector, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseTs } from './base';
/**
 * @name 表单-基本属性及方法
 * @param tab 当前tab值，必传
 * @param search 数据刷新对应函数，必传
 */
export class FormBaseTs extends BaseTs {
  public fb: FormBuilder;
  constructor(public injector: Injector) {
    super(injector);
    this.fb = this.injector.get(FormBuilder);
  }

  @Input() tab?: any = {};
  @Output() search = new EventEmitter<boolean>();

  form: FormGroup;
  formLoading: boolean = false;
  formParams: any = {};

  // 状态初始化
  formInit(values?: object) {
    this.formValuesFn();
    this.formParams = this.HttpUtilTs.paramsFn({ ...this.formParams, ...values });
    this.formLoading = true;
  }

  // 获取表单所有value（这样注册[{value: false}]，this.form.value无法全部获取）
  formValuesFn() {
    this.formParams = {};
    Object.keys(this.form.controls).forEach((key) => {
      this.formParams[key] = this.form.controls[key].value;
    });
  }

  // 保存
  saveInit(okFn: Function) {
    // 更新验证规则，统一写在前面（valid更改时会出现验证规则更新不及时的bug）
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    if (this.form.valid) {
      okFn();
    }
  }

  // 重置时confirm提示
  resetInit(okFn: Function, confirm = true) {
    if (confirm) {
      this.tip.confirm(this.i18n.baseList.resetConfirm, okFn);
    } else {
      okFn();
    }
  }

  // 取消时是否刷新数据
  cancel(refresh = false) {
    this.MenuService.closeTab(this.tab);
    this.search.emit(refresh);
  }
}
