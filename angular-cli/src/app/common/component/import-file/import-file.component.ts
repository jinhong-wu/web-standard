import { Component, Input, OnInit, Injector } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { BaseTs } from 'src/app/common/ts/base/base';
import { NzUploadFile, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { MemoryPipe } from 'src/app/common/pipe/memory.pipe';
import { DownloadService } from '../../service/download/download.service';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

/**
 * @name 上传/导入文件
 * @param importUrl 上传/导入路径（必传）
 * @param templateUrl 下载模板地址
 * @param accept 接受数据类型，默认.xlsx
 * @param size 接受数据大小，默认为0，表示不限制，单位：KB
 * @param bigSize 大文件界限大小（超过即为大文件分片上传），默认为50MB，单位：KB
 * @param bigSingle 大文件分片大小，默认为10MB，单位：KB
 * @param bigInitUrl 大文件传输前初始化url（告知后端分片数量等信息）
 * @example
		this.UploadService.file({
			importUrl: '',
			templateUrl: '',
			close(compo) {
				// 右上角关闭弹出框后操作
			}
		});
*/

@Component({
  selector: 'app-import-file',
  templateUrl: './import-file.component.html',
  styleUrls: ['./import-file.component.less'],
})
export class ImportFileComponent extends BaseTs implements OnInit {
  constructor(public injuctor: Injector, public download: DownloadService) {
    super(injuctor);
  }

  @Input() importUrl: string;
  @Input() templateUrl?: string;
  @Input() accept?: string = '.xlsx';
  @Input() size: number = 0; // 单位：KB
  @Input() bigSize: number = 1024 * 50; // 默认50MB，单位：KB
  @Input() bigSingle: number = 1024 * 10; // 默认10MB，单位：KB
  @Input() bigInitUrl: string =
    '/system-management/api/v1/system/upgrade/upload/notice';

  uploadLoading: boolean = false;
  uploadHint: any = [];
  uploadHintList: any = [
    { key: 'size', name: 'uploadFileSize' },
    { key: 'accept', name: 'uploadFileAccept' },
  ];
  uploadType: string; // 上传状态
  uploadRes: any = {}; // 接口返回
  uploadResult: any = ''; // 接口返回-message

  bigChunkSize: number = 0; // 大文件-分片数量
  bigfileResponse: any; // 大文件-文件成功后存放位置
  ngOnInit(): void {
    // 提示文字
    this.uploadHintList.forEach((d) => {
      if (this[d.key]) {
        d.value = `${this.i18n.baseList[d.name]}：`;
        if (d.key == 'size') {
          d.size = new MemoryPipe().transform(this.size);
          d.value += `<${d.size}`;
        } else {
          d.value += this[d.key];
        }
        this.uploadHint.push(d.value);
      }
    });
    this.uploadHint = this.uploadHint.join('，');
  }

  // 上传文件前
  nzBeforeUpload = (file: NzUploadFile): boolean => {
    if (this.size !== 0 && file.size > this.size) {
      this.tip.msg('warning', '文件大小超过：' + this.uploadHintList[0].size);
      return false;
    }
    let name = new RegExp(this.accept, 'ig');
    if (!name.test(file.name)) {
      this.tip.msg('warning', '文件类型仅支持：' + this.accept);
      return false;
    }
    return true;
  };

  // 上传文件改变时
  nzChange({ file, type }) {
    this.uploadType = type;
    switch (type) {
      case 'start':
        this.uploadLoading = true;
        break;
      case 'error':
        this.uploadLoading = false;
        this.uploadResult = file.error.message;
        break;
      case 'success':
        break;
      case 'done':
        this.uploadLoading = false;
        this.uploadResult = file.response.message;
        this.uploadRes = file.response;
        break;
      case 'removed':
        // 删除的手动操作后续再具体补充
        break;
    }
  }

  // 上传行为（超过大文件界限值，用大文件分片上传）
  nzCustomRequest = (item: NzUploadXHRArgs) => {
    if (item.file.size < this.bigSize) {
      this.nzCustomReq(item);
    } else {
      this.nzCustomBigReq(item);
    }
  };
  nzCustomReq = (item: NzUploadXHRArgs) => {
    const formData = new FormData();
    formData.append('file', item.file as any);
    return this.http
      .request(
        new HttpRequest('POST', item.action!, formData, {
          reportProgress: true,
          withCredentials: true,
        })
      )
      .subscribe(
        (event: HttpEvent<{}>) => {
          if (event.type === HttpEventType.UploadProgress) {
            if (event.total! > 0) {
              (event as any).percent = (event.loaded / event.total!) * 100;
            }
            item.onProgress!(event, item.file!);
          } else if (event instanceof HttpResponse) {
            item.onSuccess!(event.body, item.file!, event);
          } else if (event instanceof HttpErrorResponse) {
            item.onError!(event.error, item.file!);
          }
        },
        (err) => {
          item.onError!(err, item.file!);
        }
      );
  };

  // 大文件串行切片
  nzCustomBigReq = (item: NzUploadXHRArgs) => {
    this.bigChunkSize = Math.ceil(item.file.size / this.bigSingle);
    return this.http
      .post<any>(this.bigInitUrl, {
        filename: item.file.name, // 文件名称
        fileSize: item.file.size, // 文件大小
        sliceSize: this.bigSingle,
        chunkSize: this.bigChunkSize, // 分片数量
      })
      .subscribe(
        (resToken: any) => {
          let reqs = [];
          for (let i = resToken.data.chunk - 1; i < this.bigChunkSize; i++) {
            let start = i * this.bigSingle,
              end = start + this.bigSingle;
            if (item.file.size - end < 0) {
              end = item.file.size;
            }
            const formData = new FormData();
            formData.append('token', resToken.data.token);
            formData.append('file', item.file.slice(start, end));
            reqs.push(
              this.http.request(
                new HttpRequest('POST', item.action!, formData, {
                  withCredentials: true,
                })
              )
            );
          }

          let reqSuccess = 0;
          from(reqs)
            .pipe(mergeMap((req) => req, 1))
            .subscribe(
              (res: HttpEvent<{}>) => {
                if (res instanceof HttpResponse) {
                  this.uploadRes = res;
                  item.onProgress!(
                    { percent: (++reqSuccess / this.bigChunkSize!) * 100 },
                    item.file!
                  );
                } else if (res instanceof HttpErrorResponse) {
                  item.onError!(res.error, item.file!);
                }
              },
              (err) => {
                item.onError!(err, item.file!);
              },
              // 上传完成
              () => {
                if (this.uploadRes.body && this.uploadRes.body.data.filePath) {
                  item.onSuccess!(
                    this.uploadRes.body,
                    item.file!,
                    this.uploadRes
                  );
                }
              }
            );
        },
        (err) => {
          item.onError!(err, item.file!);
        }
      );
  };

  // 下载模板
  downloadTemplate() {
    this.download.down(this.templateUrl).subscribe();
  }
}
