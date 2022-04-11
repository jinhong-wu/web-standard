import { Component, OnInit } from '@angular/core';
import { TipModalService } from 'src/app/common/service/tip-modal.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.less'],
})
export class UploadComponent implements OnInit {
  constructor(public TipModalService: TipModalService) {}

  ngOnInit(): void {
    //setTimeout(() => {
    //  this.TipModalService.file({
    //    importUrl: '',
    //    tempUrl: 'aa',
    //    close(compo) {
    //      // 右上角关闭弹出框后操作
    //    },
    //  });
    //}, 1000);
  }
}
