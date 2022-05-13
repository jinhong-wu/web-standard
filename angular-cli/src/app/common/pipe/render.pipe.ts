import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'render'
})
/**
 * @name 字符串-模板编译器
 * @param value 字符串，必填
 * @param replace 模板编译对应值
 * @returns 字符串
 * @example data='测试${xxx}${yyy}'
 *	        => data | render: {xxx: 'x1', yyy: 'y1'} 展示为：测试x1y1
 */
export class RenderPipe implements PipeTransform {

  transform(value: string, replace: Object = {}): any {
		value = value.replace(/\$\{(.*?)\}/g, function(data){
			let d = data.substring(2, data.length-1).split("||");
			return replace[d[0]?.trim()] || d[1]?.trim() || "";
		});
		return value;
  }

}
