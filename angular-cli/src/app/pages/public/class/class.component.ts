import { Component, OnInit } from '@angular/core';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.less'],
})
export class ClassComponent implements OnInit {
  constructor() {}

  treeSearch = '';
  treeData = [];

  ngOnInit(): void {}

  // requestAnimationFrame返回id
  id = null;
  width = 300;
  onResize({ width }: NzResizeEvent): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.width = width!;
    });
  }
}
