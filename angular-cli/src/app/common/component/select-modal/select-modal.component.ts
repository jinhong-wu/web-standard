import {
  Component,
  forwardRef,
  OnInit,
  Injector,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseTs } from 'src/app/common/ts/base/base';

@Component({
  selector: 'app-select-modal',
  templateUrl: './select-modal.component.html',
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectModalComponent),
      multi: true,
    },
  ],
})
/**
 * @name select-点击出现表格弹出框
 * @param openChange 弹出框-打开表格页面方法，必传
 * @param multiple 弹出框-表格页面-是否多选，默认true多选
 * @param maxCount select-展示的最大tag数，默认4
 * @param disabled select-是否禁止选中，默认false
 * @param placeholder select-默认文字
 * @example
	#selectModal 必须取名
	formControlName 必须命名

	<app-select-modal #selectModal formControlName="modal" (openChange)="openChange()">
	</app-select-modal>
*/
export class SelectModalComponent
  extends BaseTs
  implements OnInit, ControlValueAccessor
{
  constructor(public injuctor: Injector) {
    super(injuctor);
  }

  @Output() openChange = new EventEmitter();
  @Input() multiple: boolean = true;
  @Input() maxCount: number = 4;
  @Input() disabled = false;
  @Input() placeholder?: string = '';

  isOpen = false;
  selectValue = []; // 已选value
  selectOption: Array<{ value: string; label: string }> = []; // 已选数据
  selectRows: { [key: string]: boolean } = {}; // 对应表格勾选行

  ngOnInit(): void {}

  // 开启弹出框
  nzOpenChange() {
    setTimeout(() => {
      this.isOpen = false;
    });
    this.selectRows = {};
    this.selectValue.forEach((val) => (this.selectRows[val] = true));
    this.openChange.emit();
  }

  openModal(option) {
    let _this = this,
      modal = this.nzModal.create({
        ...this.tip.modal(),
        ...option,
      });
    this.tip.modalAfter(modal, {
      close(res) {
        if (res && res != 'close') {
          _this.selectOption = res?.option;
          _this.selectValue = res?.value;
          _this.onChanged(_this.selectOption);
        }
      },
    });
  }

  ngModelChange() {
    this.selectOption = this.selectOption.filter((item) =>
      this.selectValue.includes(item.value)
    );
    this.onChanged(this.selectOption);
  }

  onChanged: any = () => {};
  onTouched: any = () => {};

  writeValue(values) {
    this.selectOption = values;
    this.selectValue = values.map((val) => val.value);
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
