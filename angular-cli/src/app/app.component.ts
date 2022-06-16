import { PlatformLocation } from '@angular/common';
import { Component, Injector } from '@angular/core';
import { BaseTs } from './common/ts/base/base';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
})
export class AppComponent extends BaseTs {
  constructor(
		public injector: Injector,
		public location: PlatformLocation,
		) {
    super(injector);
  }

	async ngOnInit() {
		// 若为登录页，需登录成功后再项目数据初始化
		const url = this.location["location"].pathname;
		if(!["/login"].includes(url)){
			this.appInit();
		}

		await this.i18n.promise();
		document.getElementsByTagName('title')[0].innerHTML =	this.i18n.list.projectTitle;
	}
}
