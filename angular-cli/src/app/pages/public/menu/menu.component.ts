import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { TableBaseTs } from 'src/app/common/ts/base/table.base';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
})
export class MenuComponent extends TableBaseTs implements OnInit {
  constructor(public injuctor: Injector) {
    super(injuctor);
  }

  // Tab（备注tab对应id，方便代码查看）
  // 概览 public-menu-overview
  // 列表 public-menu-list

  @ViewChild('overview', { static: false }) overview;
  @ViewChild('list', { static: false }) list;

  ngOnInit() {
    this.MenuService.initTab(); // 菜单页面必须调用此方法，生成菜单数据
  }

  // 刷新表格数据
  tableDataFn(refresh) {
    if (refresh) this.list.tableDataFn(refresh);
  }
}
