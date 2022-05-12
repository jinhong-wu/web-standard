import { Component, Injector, OnInit } from '@angular/core';
import { BaseTs } from 'src/app/common/ts/base/base';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.less']
})
export class PublicComponent extends BaseTs implements OnInit {

  constructor(
		public injector: Injector
	) {
    super(injector);
		this.i18n.use(this.translate);
	}

  ngOnInit(): void {
  }

}
