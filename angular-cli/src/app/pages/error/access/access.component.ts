import { Component, OnInit } from '@angular/core';
import { I18nService } from 'src/app/common/service/system/i18n.service';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.less']
})
export class AccessComponent implements OnInit {

  constructor(public i18n: I18nService) { }

  ngOnInit(): void {
  }

}
