import { Component, OnInit, Injector } from '@angular/core';
import { BaseTableTs } from 'src/app/common/ts/base/table.base';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less'],
})
export class FormComponent extends BaseTableTs implements OnInit {
  constructor(public injuctor: Injector) {
    super(injuctor);
  }

  ngOnInit() {}
}
