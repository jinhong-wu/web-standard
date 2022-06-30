import { Injectable, Injector } from '@angular/core';
import { BatchDeleteComponent } from '../component/batch-delete/batch-delete.component';
import { ImportFileComponent } from '../component/import-file/import-file.component';
import { PwdVerifyComponent } from '../component/pwd-verify/pwd-verify.component';
import { ImportOptions, ModalBatchOptions } from '../entity/tip';
import { BaseTs } from '../ts/base';

/**
 * @name 基本对话框（弹框页）
 */

@Injectable({
  providedIn: 'root',
})
export class TipModalService extends BaseTs {
  constructor(public injector: Injector) {
    super(injector);
  }

  // 批量删除
  delete(options: ModalBatchOptions) {
    const modal = this.nzModal.create({
      ...this.tip.modal(),
      nzTitle: this.i18n.baseList.batch + this.i18n.baseList.delete,
      nzContent: BatchDeleteComponent,
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
        options?.resFn(comp.tableSuccessData);
      },
    });
  }

  // 导入文件
  file(options: ImportOptions) {
    const modal = this.nzModal.create({
      ...this.tip.modal(),
      nzTitle: options.title || this.i18n.baseList.import,
      nzContent: ImportFileComponent,
      nzWidth: 700,
      nzComponentParams: options,
    });
    this.tip.modalAfter(modal, {
      close() {
				let comp = modal.getContentComponent();
        options?.resFn(comp);
      },
    });
  }

	// 密码验证
	verify(fn: Function) {
		const modal = this.nzModal.create({
			...this.tip.modal(),
			nzTitle: this.i18n?.list?.other?.pwdVerify,
			nzWidth: 500,
			nzContent: PwdVerifyComponent,
		});
		this.tip.modalAfter(modal, {
			close(res) {
				if(res) fn?.();  // 验证成功
			}
		})
	}
}
