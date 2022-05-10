import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UtilTs } from 'src/app/common/ts/util/util';
import { I18nService } from '../../service/system/i18n.service';

@Component({
  selector: 'app-form-control-info',
  templateUrl: './form-control-info.component.html',
  styleUrls: ['./form-control-info.component.less']
})
/**
 * @name 表单-规则说明
 * @param tooltip 规则说明，必传
 * @param replace 当tooltip为模板字符串时，对应模板值
 * @example
  <app-form-control-info [tooltip]="" [replace]="{key: value}"></app-form-control-info>
*/
export class FormControlInfoComponent implements OnChanges {

	constructor(public i18n: I18nService) {}

	@Input() tooltip: string = '';
	@Input() replace: Object = {};

	nzTooltip = '';

  ngOnChanges(changes: SimpleChanges) {
		if (changes.tooltip || changes.replace) {
			this.nzTooltip =  UtilTs.render(this.tooltip, this.replace)
		}
	}

}
