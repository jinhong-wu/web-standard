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
		
		this.i18n.promise(()=>{
			document.getElementsByTagName("title")[0].innerHTML = this.i18n.i18nList.projectTitle;
		});
  }
}
