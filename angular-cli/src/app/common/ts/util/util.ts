export class UtilTs {
  // 模板编译器
	static render(value: string, replace: Object = {}) {
		// 例：value='测试${xxx}${yyy}'，replace={xxx: '', yyy: ''}
		value = value.replace(/\$\{(.*?)\}/g, function(data){
			let d = data.substring(2, data.length-1).split("||");
			return replace[d[0]?.trim()] || d[1]?.trim() || data;
		});
		return value;
	}
}