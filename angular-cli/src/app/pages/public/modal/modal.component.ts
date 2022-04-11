import { Component, OnInit, Injector } from '@angular/core';
import { BaseTs } from 'src/app/common/ts/base/base';
import { ModalCreateComponent } from './modal-create/modal-create.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less'],
})
export class ModalComponent extends BaseTs implements OnInit {
  constructor(public injuctor: Injector) {
    super(injuctor);
  }

  ngOnInit(): void {
    //setTimeout(()=>{
    //	//this.tip.confirm("是否删除所选表格数据？", ()=>{
    //	//	// 确认后代码...
    //	//	console.log(1);
    //	//});
    //const modal = this.nzModal.create({
    //	...this.tip.modal(),
    //	nzTitle: '标题',
    //	nzContent: ModalCreateComponent,
    //	nzComponentParams: {
    //		// 传递数据
    //	},
    //});
    //this.tip.modalAfter(modal, {
    //	close(res) {
    //		// 关闭后代码...
    //	}
    //})
    //}, 1000)
  }
}
