import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/common/service/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.less'],
})
export class UploadComponent implements OnInit {
  constructor(public UploadService: UploadService) {}

  ngOnInit(): void {
    //setTimeout(()=>{
    //	this.UploadService.file({
    //		importUrl: '',
    //		templateUrl: 'aa',
    //		close(compo) {
    //			// 右上角关闭弹出框后操作
    //		}
    //	})
    //}, 1000)
  }
}
