import { PlatformLocation } from '@angular/common';
import { Component, Injector } from '@angular/core';
import { BaseTs } from './common/ts/base';

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

	ngOnInit() {
	}
}
