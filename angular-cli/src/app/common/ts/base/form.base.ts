import { EventEmitter, Injector, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseTs } from './base';
/**
 * @name 表单-基本属性及方法
 * @param tab 当前tab值
 * @param tabIndex 当前tab index值，必传
 * @param search 数据刷新对应函数，必传
 */
export class BaseFormTs extends BaseTs {
  public fb: FormBuilder;

  constructor(public injector: Injector) {
    super(injector);
    this.fb = this.injector.get(FormBuilder);
  }

  @Input() tab?: any = {};
  @Input() tabIndex: number;
  @Output() search = new EventEmitter<boolean>();

  form: FormGroup;
  formLoading: boolean = false;
  formParams: any = {};

  // 状态初始化
  formInit(values: object = {}) {
    this.formParams = this.httpUtil.paramsFn(values);
    this.formLoading = true;
  }

  // 获取表单所有value（这样注册[{value: false}]，this.form.value无法全部获取）
  formValuesFn() {
    let values = {};
    Object.keys(this.form.controls).forEach((key) => {
      values[key] = this.form.controls[key].value;
    });
    return values;
  }

  // 保存
  saveInit(okFn: Function) {
    if (this.form.valid) {
      okFn();
    } else {
      for (const i in this.form.controls) {
        this.form.controls[i].markAsDirty();
        this.form.controls[i].updateValueAndValidity();
      }
    }
  }

  // 重置时confirm提示
  resetInit(okFn: Function) {
    this.tip.confirm('是否重置？', okFn);
  }

  // 关闭时是否刷新数据
  cancel(refresh = false) {
    this.MenuService.closeTab(this.tabIndex);
    this.search.emit(refresh);
  }
}
