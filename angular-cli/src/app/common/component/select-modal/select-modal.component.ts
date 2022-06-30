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
import { BaseTs } from 'src/app/common/ts/base';
/**
 * @name select-点击出现表格弹出框
 * @param openChange 弹出框-打开表格页面方法，必传
 * @param multiple 弹出框-表格页面-是否多选，默认true多选
 * @param maxCount select-展示的最大tag数，默认4
 * @param disabled select-是否禁止选中，默认false
 * @param nzPlaceHolder select-默认文字
 * @param value select-对应value字段，默认'value'
 * @param label select-对应label字段，默认'label'
 * @example
	#selectModal 必须取名
	formControlName 必须命名

	<app-select-modal #selectModal formControlName="modal" [nzPlaceHolder]="" (openChange)="openChange()">
	</app-select-modal>
*/
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
  @Input() nzPlaceHolder?: string = '';
	@Input() value: string  = 'value';
	@Input() label: string  = 'label';

  isOpen = false;
  selectValue: any; // 已选value
  selectOption: Array<any> = []; // 已选数据
  selectRows: { [key: string]: any } = {}; // 对应表格勾选行

  ngOnInit(): void {}

  // 开启弹出框
  nzOpenChange() {
    setTimeout(() => {
      this.isOpen = false;
    });
    this.selectRows = {};
    this.selectOption.forEach((d) => (this.selectRows[d.value] = d));
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
					_this.selectOption = [];
					(res?.option || []).forEach(d => {
						_this.selectOption.push({
							value: d[_this.value],
							label: d[_this.label],
							...d
						})
					});
					if (_this.multiple) {
						_this.selectValue = res?.value || [];
					} else {
						_this.selectValue = res?.value?.[0] || '';
					};
          _this.onChanged(_this.selectOption);
					option.close?.(_this);
        }
      },
    });
  }

  ngModelChange() {
		if (this.multiple) {
			this.selectOption = this.selectOption.filter((d) => {
				return this.selectValue.includes(d.value);
			});
		} else {
			this.selectOption = [];
		}
    this.onChanged(this.selectOption);
  }

  onChanged: any = () => {};
  onTouched: any = () => {};

  writeValue(values) {
		this.selectOption = [];
		(values || []).forEach(d => {
			this.selectOption.push({
				value: d[this.value],
				label: d[this.label],
				...d
			})
		});
		if (this.multiple) {
			this.selectValue = this.selectOption.map((val) => val.value);
		} else {
			this.selectValue = this.selectOption[0]?.value || '';
		};
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
