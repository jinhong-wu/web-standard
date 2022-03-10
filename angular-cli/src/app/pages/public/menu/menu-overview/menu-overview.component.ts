import { Component, Injector, OnInit } from '@angular/core';
import { BaseTs } from 'src/app/common/ts/base/base';

@Component({
  selector: 'app-menu-overview',
  templateUrl: './menu-overview.component.html',
  styleUrls: ['./menu-overview.component.less'],
})
export class MenuOverviewComponent extends BaseTs implements OnInit {
  constructor(public injector: Injector) {
    super(injector);
  }
  ngOnInit(): void {}

  getOverview() {
    this.tip.msg('warning', '点击到概览页面，调用getOverview()方法刷新数据');
  }
}
