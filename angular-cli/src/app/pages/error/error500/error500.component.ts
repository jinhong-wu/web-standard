import { Component, OnInit } from '@angular/core';
import { I18nService } from 'src/app/common/service/system/i18n.service';

@Component({
  selector: 'app-error500',
  templateUrl: './error500.component.html',
  styleUrls: ['./error500.component.less']
})
export class Error500Component implements OnInit {

  constructor(public i18n: I18nService) { }

  ngOnInit() {
  }

}
