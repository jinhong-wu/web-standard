import { Component, Injector } from '@angular/core';
import { BaseTs } from './common/ts/base/base';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
})
export class AppComponent extends BaseTs {
  constructor(public injector: Injector) {
    super(injector);
    window.sessionStorage.setItem('lang', 'zh');

    this.i18n.promise(() => {
      document.getElementsByTagName('title')[0].innerHTML =
        this.i18n.list.projectTitle;
    });
  }
}
