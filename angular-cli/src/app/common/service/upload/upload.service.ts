import { Injectable, Injector } from '@angular/core';
import { BaseTs } from '../../ts/base/base';
import { ImportFileComponent } from '../../component/import-file/import-file.component';

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
export class UploadService extends BaseTs {
  constructor(public injector: Injector) {
    super(injector);
  }

  // 导入文件
  file(options: importOptions) {
    const modal = this.nzModal.create({
      ...this.tip.modal(),
      nzTitle: this.i18n.baseList.import,
      nzContent: ImportFileComponent,
      nzWidth: 700,
      nzComponentParams: options,
      nzOnCancel: (compo) => {
        options?.close(compo);
      },
    });
    // 支持拖拽（该弹出框关闭函数调用nzOnCancel）
    this.tip.modalAfter(modal);
  }
}
