import { Component, OnInit, Injector } from '@angular/core';
import { BaseTableComponent } from 'src/app/common/component/base/base-table.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class FormComponent extends BaseTableComponent implements OnInit {

  constructor(
		public injuctor: Injector,
	) { 
		super(injuctor);
	}

  ngOnInit() {
  }

}
