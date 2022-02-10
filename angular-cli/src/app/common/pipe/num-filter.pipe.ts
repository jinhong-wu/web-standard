import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numFilter'
})
/**
 * @name 数值-简化
 * @param value 数值，必填
 * @returns 简化数
 * @example 10000 => 1
 * 一般和NumUnitPipe搭配使用
 */
export class NumFilterPipe implements PipeTransform {

  transform(value: number): any {
    if (10000 <= value && value < 100000000) {
      return (value / 10000).toFixed(2);
    }
    if (value >= 100000000) {
      return (value / 100000000).toFixed(2);
    }
    return value;
  }

}
