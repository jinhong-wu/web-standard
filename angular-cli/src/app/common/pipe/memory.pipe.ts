import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'memory'
})
/**
 * @name 过滤器-计量单位
 * @param value 数据，必填
 * @param unit 单位，默认为KB
 * @returns string
 * @example data = 1024 => data | memory:'MB'  展示为：1.00GB
*/
export class MemoryPipe implements PipeTransform {

  transform(value: number, unit: string = 'KB'): any {
		if (!value || value === 0) return `0.00 ${unit}`;
		let units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
				unitI = 0;
		if (unit) unitI = units.indexOf(unit);
		for (let i = unitI, unitL = units.length;i < unitL; i++) {
			if (value >= 1024) {
				value = value / 1024;
			} else {
				return value.toFixed(2) + units[i];
			}
		};
	}

}
