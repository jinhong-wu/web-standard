import { Component, OnInit } from '@angular/core';
import { I18nService } from 'src/app/common/service/system/i18n.service';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.less']
})
export class Error404Component implements OnInit {

  constructor(public i18n: I18nService) { }

  ngOnInit() {
  }

}
