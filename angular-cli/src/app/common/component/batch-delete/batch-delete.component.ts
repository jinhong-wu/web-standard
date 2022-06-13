import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { I18nService } from '../../service/system/i18n.service';
/**
 * @name 批量删除
 * @example 参考TipModalService.delete()
 * 规范3.0 批量删除改成一个接口，百分比不显示 ，后端返回成功列表和成功列表
*/
@Component({
  selector: 'app-batch-delete',
  templateUrl: './batch-delete.component.html',
  styleUrls: ['./batch-delete.component.less']
})
export class BatchDeleteComponent implements OnInit {
  constructor(public i18n: I18nService, public nzModalRef: NzModalRef) {}

  @Input() checkedData: Array<any> = []; // 批量操作数据
  @Input() columns: Array<object> = []; // 记录表格展示数据
  @Input() doFn: Function; // 执行操作的函数

  tabs = [
    { id: 'success', name: this.i18n.baseList.batchSuccessRecord },
    { id: 'error', name: this.i18n.baseList.batchErrorRecord },
  ];
  selectIndex = 0;

  tableSuccessData: any = [];
  tableErrorData: any = [];
  tableSize: number = 5;

  currentNodeName = '';
  async ngOnInit() {
    // 执行fn函数，进行批量操作。
    for (let i = 0; i < this.checkedData.length; i++) {
      let data = this.checkedData[i];
      this.currentNodeName = data.name;
      try {
        await this.doFn(data).toPromise();
        this.tableSuccessData.push(data);
				this.tableSuccessData = [...this.tableSuccessData];
      } catch (err) {
        this.tableErrorData.push({
          reason: this.getErrorMsg(err),
          ...data,
        });
				this.tableErrorData = [...this.tableErrorData];
      }
    }
  }

  // 获取批量操作进度
  get progress(): number {
    if (this.checkedData.length === 0) {
      return 0;
    } else {
      return Math.ceil(
        ((this.tableSuccessData.length + this.tableErrorData.length) /
          this.checkedData.length) *
          100
      );
    }
  }

  // 操作失败，获取错误原因
  getErrorMsg(err) {
    if (err.error != null && err.error.details && err.error.details.length) {
      return err.error.details;
    }

    if (err.message != null && err.message.length !== 0) {
      return err.message;
    }

    if (err.ev != null && err.ev.error.details) {
      return err.ev.error.details;
    }
  }
}
