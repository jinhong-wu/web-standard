import { Injectable, Injector } from '@angular/core';
import { ImportFileComponent } from '../component/import-file/import-file.component';
import { ModalBatchComponent } from '../component/modal-batch/modal-batch.component';
import { BaseTs } from '../ts/base/base';

/**
 * @name 基本对话框（弹框页）
 */

interface modalBatchOptions {
  nzTitle: string;
  checkedData: Array<any>; // 批量操作数据
  columns: Array<Column>; // 记录表格展示数据
  doFn: Function; // 执行操作的函数
  resFn?: Function; // 执行完成后的回调函数
}

interface Column {
  title: string; // 表-列名
  colKey: string; // 表-列关键字
  format?: Function; // 表-列数据处理方法
}

interface importOptions {
  importUrl: string; // 上传/导入路径，必传
  templateUrl?: string; // 下载模板地址
  accept?: string; // 接受数据类型
  size?: number; // 接受数据大小，单位：KB
  bigSize?: number; // 大文件界限大小，单位：KB
  bigSingle?: number; // 大文件分片大小，单位：KB
  bigInitUrl?: string; // 大文件传输前初始化url
  close?: Function; // 下载弹框关闭后操作
}

@Injectable({
  providedIn: 'root',
})
export class TipModalService extends BaseTs {
  constructor(public injector: Injector) {
    super(injector);
  }

  // 批量操作
  batch(options: modalBatchOptions) {
    const modal = this.nzModal.create({
      ...this.tip.modal(),
      nzTitle: this.i18n.baseList.batch + options.nzTitle,
      nzContent: ModalBatchComponent,
      nzWidth: 800,
      nzComponentParams: {
        checkedData: options.checkedData,
        columns: options.columns,
        doFn: options.doFn,
      },
    });
    this.tip.modalAfter(modal, {
      close() {
        let comp = modal.getContentComponent();
        options.resFn(comp.tableSuccessData);
      },
    });
  }

  // 导入文件
  file(options: importOptions) {
    const modal = this.nzModal.create({
      ...this.tip.modal(),
      nzTitle: this.i18n.baseList.import,
      nzContent: ImportFileComponent,
      nzWidth: 700,
      nzComponentParams: options,
      // 该弹出框关闭函数调用nzOnCancel
      nzOnCancel: (compo) => {
        options?.close(compo);
      },
    });
    this.tip.modalAfter(modal);
  }
}