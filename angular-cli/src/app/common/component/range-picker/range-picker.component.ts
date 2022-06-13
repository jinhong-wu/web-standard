import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { I18nService } from '../../service/system/i18n.service';
import { TipService } from '../../service/tip.service';
/**
 * @name 时间范围选择器
 * @param dateFn 接收时间
*/
@Component({
  selector: 'app-range-picker',
  templateUrl: './range-picker.component.html',
  styleUrls: ['./range-picker.component.less'],
})
export class RangePickerComponent implements OnInit {
  constructor(public tip: TipService, public i18n: I18nService) {}

  @Output() dateFn = new EventEmitter<object>();

  startDt = '';
  endDt = '';
  ngOnInit(): void {}

  // 选择日期
  chooseDate() {
    if (
      new DatePipe('zh').transform(this.startDt, 'yyyy-MM-dd HH:mm:ss') >
      new DatePipe('zh').transform(this.endDt, 'yyyy-MM-dd HH:mm:ss')
    ) {
      this.tip.msg('warning', this.i18n.baseList.confirmDt);
      return;
    }
    this.dateFn.emit([this.startDt, this.endDt]);
  }
}
