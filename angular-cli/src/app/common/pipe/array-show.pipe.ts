import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "arrayShow",
})
/**
 * @name 数组展示为字符串
 * @param value 数组，必填
 * @param key 需要展示的参数
 * @param limit 需要展示的个数
 * @param symbol 分隔符
 * @returns string
 * @example data = [{id: '1', name: 'name1'}, {id: '2', name: 'name2'}]
 * 					=> data | arrayShow:'name':data.length:"，"  展示为：name1，name2
 */
export class ArrayShowPipe implements PipeTransform {
  transform(value: Array<any> = [], key = "", limit = value.length, symbol = "，"): any {
    if (value === null || typeof value !== "object") {
      return value;
    }
    let info = "",
      len = value.length > limit ? limit : value.length;
    if (key) {
      for (let i = 0; i < len; i++) {
        info += value[i][key];
        if (value[i + 1]) info += symbol;
      }
    } else {
      for (let i = 0; i < len; i++) {
        info += value[i];
        if (value[i + 1]) info += symbol;
      }
    }
    if (value.length > limit) info += "...";
    return info;
  }
}