import { Injectable, RendererFactory2 } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { I18nService } from './system/i18n.service';
import { RenderPipe } from '../pipe/render.pipe';
/**
 * @name 提示框、对话框
*/
interface modalAfter {
  open?: Function;
  close?: Function;
}

@Injectable({
  providedIn: 'root',
})
export class TipService {
  constructor(
    private i18n: I18nService,
    private nzMessage: NzMessageService,
    private notification: NzNotificationService,
    private nzModal: NzModalService,
    private rendererFactory2: RendererFactory2
  ) {}

  msgRemove(id) {
    this.nzMessage.remove(id);
  }

  // 顶部居中提示（前端提示）
  msg(type = 'info', content = this.i18n?.baseList?.noContent, options?: object) {
    return this.nzMessage.create(type, content, options);
  }

  // 右下角通知框（后端接口调用的提示）
  notify(type = 'info', title = this.i18n?.baseList?.confirmInfo, content = '') {
    this.notification.create(type, title, content, {
      nzDuration: 3000,
      nzPlacement: 'bottomRight',
    });
  }

  // 右下角通知框-成功提示
  successNotify(type, name = '') {
    this.notify('success', this.i18n.baseList.success,
			new RenderPipe().transform(this.i18n.baseList.successNotify, { type: this.i18n.baseList[type] || '', name: name })
    );
  }

  // 右下角通知框-失败提示
  errorNotify(type, name = '') {
		debugger
    this.notify('error', this.i18n.baseList.error,
			new RenderPipe().transform(this.i18n.baseList.errorNotify, { type: this.i18n.baseList[type] || '', name: name })
    );
  }

  // 确认对话框（确认操作）
  confirm(content = "", okFn: Function) {
    this.nzModal.confirm({
      nzTitle: this.i18n?.baseList?.confirmInfo,
      nzContent: content || this.i18n?.baseList?.noContent,
      nzOnOk() {
        okFn();
      },
    });
  }

  // 基本对话框（弹框页）- 统一配置
  modal() {
    return {
      nzWrapClassName: 'ant-modal-wrap-base',
      nzMaskClosable: false,
      nzFooter: null,
    };
  }

  // 基本对话框（弹框页）
  modalAfter(modal, after?: modalAfter) {
    modal.afterOpen.subscribe(() => {
      this.enableModalDrag(modal); // 支持拖拽
      after?.open?.();
    });

    if (after?.close) {
      modal.afterClose.subscribe((res) => {
        after.close(res);
      });
    }
  }

  // 基本对话框-拖拽
	enableDivDrag(divEle) {
		const render = this.rendererFactory2.createRenderer(null, null);
		const modalBackground = divEle.nativeElement;
		const modalElement = divEle.nativeElement;
		const modalTitleElement = this.createModalTitleElement(render, modalElement);
		this.dragListen(render, modalTitleElement, modalElement, modalBackground);
	}
  enableModalDrag(refModal) {
    const render = this.rendererFactory2.createRenderer(null, null);
    const modalBackground = refModal.containerInstance.elementRef.nativeElement;
    const modalElement =
      refModal.containerInstance.elementRef.nativeElement.querySelector(
        '.ant-modal-content'
      );
    const modalTitleElement = this.createModalTitleElement(
      render,
      modalElement
    );
    this.dragListen(render, modalTitleElement, modalElement, modalBackground);
  }
  createModalTitleElement(render, modalElement) {
    let element = document.createElement('div') as any;
    render.setStyle(element, 'width', '100%');
    render.setStyle(element, 'height', '54px');
    render.setStyle(element, 'position', 'absolute');
    render.setStyle(element, 'top', '0');
    render.setStyle(element, 'left', '0');
    render.setStyle(element, 'cursor', 'move');
    render.setStyle(element, '-moz-user-select', 'none');
    render.setStyle(element, '-webkit-user-select', 'none');
    render.setStyle(element, '-ms-user-select', 'none');
    render.setStyle(element, '-khtml-user-select', 'none');
    render.setStyle(element, 'user-select', 'none');
    render.appendChild(modalElement, element);
    return element;
  }
  dragListen(render, modalTitleElement, modalElement, modalBackground) {
    render.listen(
      modalTitleElement,
      'mousedown',
      function (event) {
        this.mouseDownX = event.clientX;
        this.mouseDownY = event.clientY;
        this.modalX = modalElement.offsetLeft;
        this.modalY = modalElement.offsetTop;
        render.setStyle(modalElement, 'left', `${this.modalX}px`);
        render.setStyle(modalElement, 'top', `${this.modalY}px`);
        this.canMove = true;
      }.bind(this)
    );
    render.listen(
      modalTitleElement,
      'mouseup',
      function (event) {
        this.canMove = false;
      }.bind(this)
    );
    render.listen(
      modalBackground,
      'mousemove',
      function (event) {
        if (this.canMove) {
          let moveX = event.clientX - this.mouseDownX;
          let moveY = event.clientY - this.mouseDownY;
          let newModalX = this.modalX + moveX;
          let newModalY = this.modalY + moveY;
          render.setStyle(modalElement, 'left', `${newModalX}px`);
          render.setStyle(modalElement, 'top', `${newModalY}px`);
        }
      }.bind(this)
    );
  }
}
