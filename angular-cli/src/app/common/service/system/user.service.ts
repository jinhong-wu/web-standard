import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/**
 * @name 用户信息
*/
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

	loading: boolean = false;
  list = {};

	// 获取用户信息
	initUser() {
		this.loading = true;
    //this.http.get(`assets/i18n/${this.lang}.json`).subscribe((res: any) => {
      //this.list = res;
      this.loading = false;
    //});
	}
	
	// 退出登录


	promise() {
		return new Promise((resolve, reject) => {
			let timer = setInterval(() => {
				if (!this.loading) {
					clearInterval(timer);
					resolve(true);
				}
			}, 500);
    });
  }

}
