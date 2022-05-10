import { Component, OnInit } from '@angular/core';
import { I18nService } from 'src/app/common/service/system/i18n.service';

@Component({
  selector: 'app-error403',
  templateUrl: './error403.component.html',
  styleUrls: ['./error403.component.less']
})
export class Error403Component implements OnInit {

  constructor(public i18n: I18nService) { }

  ngOnInit() {
  }

}
