import { Component, OnInit, Injector } from '@angular/core';
import { BaseTableTs } from 'src/app/common/ts/base/table.base';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
})
export class MenuComponent extends BaseTableTs implements OnInit {
  constructor(public injuctor: Injector) {
    super(injuctor);
  }

  // Tab
  // 表单列表 public-menu-list

  item = {
    id: '1',
    name: '用户信息1',
    username: 'admin',
    address: '启明星辰',
    describe: '描述',
  };
  ngOnInit() {
    // 菜单页面必须调用此方法，生成菜单数据
    this.MenuService.initTab();
  }

  tableDataFn(reset) {
    console.log('tableDataFn()：' + reset);
  }
}
