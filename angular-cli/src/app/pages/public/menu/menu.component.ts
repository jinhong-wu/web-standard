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

  // Tab
  // 表单列表 public-menu-list

  @ViewChild('menuList', { static: false }) menuList: any = {};

  ngOnInit() {
    this.MenuService.initTab(); // 菜单页面必须调用此方法，生成菜单数据
  }

  // 刷新表格数据
  tableDataFn(reset) {
    this.menuList.tableDataFn(reset);
  }
}
