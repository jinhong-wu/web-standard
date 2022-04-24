export class UtilTs {
  // 模板编译器
	static render(value: string, replace: Object = {}) {
		// 例：value='测试${xxx}${yyy}'，replace={xxx: '', yyy: ''}
		for(let key in replace){
			let reg = new RegExp("\\${"+key+"}", "g");
			value = value.replace(reg, replace[key]);
			}
		return value;
	}
}