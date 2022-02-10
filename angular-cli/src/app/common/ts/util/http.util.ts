import {HttpParams} from '@angular/common/http';

export class httpUtil {

	// 无效字符
	static invalidList = [undefined, null, NaN, ""];
	// 转义字符
	static encodeUrlList = [',','/','?',':','@','&','=','+','#','$'];

	// 去除params无效值
	static paramsFn(params: object = {}, fn?: Function): object {
		let result = {},
		value = null;
		for(let key in params) {
			value = params[key];
			if (typeof value == "string") value = value?.trim();
			if(!this.invalidList.includes(value)) {
				result[key] = value;
				if(fn) fn(key, value);
			}
		}
		return result;
	}

	// GET请求，返回：?xx=x&yy=y&
	static getString(params: object = {}): string {
    let result = '?';
		this.paramsFn(params, (key, value)=>{
			if(this.encodeUrlList.includes(value)){
				result += key + '=' + encodeURIComponent(value) + '&';
			} else {
				result += key + '=' + value + '&';
			}
		});
    return result;
  }

	// GET请求，返回：HttpParams
	static getHttpParam(params: object = {}): HttpParams {
    let result: HttpParams = new HttpParams();
		this.paramsFn(params, (key, value)=>{
			if(this.encodeUrlList.includes(value)){
				result = result.append(key, encodeURIComponent(value));
			} else {
				result = result.append(key, value);
			}
		});
    return result;
  }

}
