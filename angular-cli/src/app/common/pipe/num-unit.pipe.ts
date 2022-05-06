import { Pipe, PipeTransform } from '@angular/core';
import { I18nService } from '../service/system/i18n.service';

@Pipe({
  name: 'numUnit'
})
/**
 * @name 数值-简化单位
 * @param value 数值，必填
 * @returns 单位
 * @example 10000 => 万
 * 一般和NumFilterPipe搭配使用
 */
export class NumUnitPipe implements PipeTransform {

	constructor(private i18n: I18nService) {}

  transform(value: number): any {
    if (10000 <= value && value < 100000000) {
      return " " + this.i18n.list.unit.thousand;
    } else if (value >= 100000000) {
      return " " + this.i18n.list.unit.million;
    }
    return "";
  }

}
