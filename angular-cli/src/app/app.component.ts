import { Component, Injector } from '@angular/core';
import { BaseComponent } from './common/component/base/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent extends BaseComponent {
	constructor(
    public injector: Injector
  ) {
		super(injector)
    window.sessionStorage.setItem("lang", "zh");
		
		let timer = setInterval(()=>{
			if (!this.publicI18nLoading) {
				clearInterval(timer);
				document.getElementsByTagName("title")[0].innerHTML = this.publicI18n.project.title;
			}
		}, 500);
  }
}
