import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PatternService {
  constructor() {}
  // IPV4
  IPV4: RegExp = /^(25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}$/;
	// IPV4范围（IPV4-255）
	IPV4_PORT: RegExp = /^((25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3})(\-(25[0-5]|2[0-4]\d|[0-1]?\d?\d))?$/;
	// IPV4范围、子网掩码（IPV4/32）
	IPV4_SUBNETMASK: RegExp = /^((25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3})(\/([0-9]$|[0-2][0-9]|3[0-2]))?$/;
  // IPV4范围（IPV4-IPV4）
  IPV4_RANGE: RegExp = /^((25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3})(\-((25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}))?$/;
	// IPV4范围（192.168.2,5-8.8,10-32,40-89,50）
	IPV4_RANGE0 = /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){2}((\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b[1-9]\b))(\,(\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b\d\b)\-(\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b[1-9]\b))*(\,(\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b[1-9]\b))*\.(\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b[1-9]\b)(\,(\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b\d\b)\-(\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b[1-9]\b))*(\,(\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b[1-9]\b))*$/;
	// IPV4范围（192.168.2,12-23,54-89,100.10-32,40-89,50,80）
	IPV4_RANGE1 = /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){2}(\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b[1-9]\b)(\,(\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b\d\b)\-(\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b[1-9]\b))*(\,(\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b[1-9]\b))*\.((\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b\d\b)\-(\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b[1-9]\b))(\,(\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b\d\b)\-(\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b[1-9]\b))*(\,(\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b[1-9]\b))*$/;
	// IPV4范围（192.168.3-5,8.10-255）
	IPV4_RANGE2 = /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){2}((\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b\d\b)\-(\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b[1-9]\b))(\,(\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b\d\b)\-(\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b[1-9]\b))*(\,(\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b\d\b))*\.((\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b\d\b)\-(\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b[1-9]\b))(\,(\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b\d\b)\-(\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b[1-9]\b))*(\,(\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b\d\b))*$/
	// IPV4范围（192.168.0-255.10,23-37,78）
	IPV4_RANGE3 = /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){2}((\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b\d\b)\-(\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b[1-9]\b))(\,(\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b\d\b)\-(\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b[1-9]\b))*(\,(\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b\d\b))*\.(\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b[1-9]\b)(\,(\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b\d\b)\-(\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b[1-9]\b))*(\,(\b25[0-5]\b|\b2[0-4]\d\b|\b1\d\d\b|\b[1-9]\d\b|\b\d\b))*$/;
  
	// IPV6
	IPV6: RegExp = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
  // IPV6范围、子网掩码（fec0:16::172:16:123:105/200）
 	IPV6_SUBNETMASK: RegExp = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*\/(12[0-8]|1[0-1]\d|[1-9]\d|[1-9])$/;
	// IPV6范围（IPV6-IPV6）
	IPV6_RANGE: RegExp = /^(((([a-fA-F0-9]{1,4}\:){0,7}([\:\:]){0,2}([a-fA-F0-9]{1,4}\:?){0,7}))(\:(25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3})?)(\-((([a-fA-F0-9]{1,4}\:){0,7}([\:\:]){0,2}([a-fA-F0-9]{1,4}\:?){0,7}))(\:(25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3})?)?$/;
	
  // PORT（1-65535）
  PORT: RegExp = /^([1-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
  PORT_MIN = 1;
  PORT_MAX = 65535;
	// PORT范围（PORT-PORT）
	PORT_RANGE: RegExp = /^(([1-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])(\-([1-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])))?$/;
	
  // 域名
  DOMAIN: RegExp = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
  // 其他姓名
  NAME: RegExp = /^[\u4e00-\u9fa5A-Za-z0-9\-\_\.\(\)\[\]]{1,64}$/;
  // 用户名
  USERNAME: RegExp = /^[A-Za-z0-9\-\_\.\(\)]{1,64}$/;
  // 真实姓名
  REALNAME: RegExp = /^[\u4e00-\u9fa5A-Za-z0-9\-_\.\(\)\[\]]{1,64}$/;
  // 帐号
  ACCOUNTNAME: RegExp = /^[a-zA-Z0-9_.\[\]()\-]{1,64}$/;
  // 文件路径
  FILE_PATH: RegExp = /^(?!.*[\?|\*|:|"|<|>|\|])/;
  // URL
  URL: RegExp = /^(https?|http|ftp|file):\/\/[\[\]-a-zA-Z0-9\+\&\@\#\/\%\?\=\~\_\|\!\:\,\.\;]*[-a-zA-Z0-9\+\&\@\#\/\%\=\~\_\|]/;
  URL_SPE: RegExp = /[\^\{\}\$]/;

  ABLITY_NAME_ZH: RegExp = /^[a-zA-Z0-9_.\-\u4e00-\u9fa5]+$/;
  NAME_ZH: RegExp = /^[a-zA-Z0-9_.\[\]()\-\u4e00-\u9fa5]+$/;
  // 电话
  PHONE: RegExp = /^(((\+\d{2}-)?0\d{2,3}-\d{7,8})|((\+\d{2}-)?(\d{2,3}-)?([1][2-9][0-9]\d{8})))$/;
  // 邮箱
  EMAIL: RegExp = /^(?=^.{0,50}$)\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  EMAIL_REG: RegExp = /^([a-z0-9_\.-]+)@([\da-z\.]+)\.([a-z\.]{2,6})$/;
  // 密码
  PASSWORD: RegExp = /^[a-zA-Z0-9\~\`\!\@\#\$\%\^\&\*\(\)\_\-\+\=\{\}\[\]\:\;\"\'\<\>\,\.\?\/\|\\]{96}$/;
  // 编号
  CODE: RegExp = /^[A-Za-z0-9_-]{1,32}$/;
  // 描述信息
  DESCRIPTION: RegExp = /^.{0,1024}$/;

	// IPV4 + IPV6
  checkIPV46 = (control: FormControl): ValidationErrors | null => {
    const value = control.value;
		if (value && !this.IPV4.test(value) && !this.IPV6.test(value)) {
			return { pattern: true };
		};
		return null;
  }
}
