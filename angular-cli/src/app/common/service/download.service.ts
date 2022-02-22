import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipService } from './tip.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  constructor(public http: HttpClient, public tip: TipService) {}

  blobType = {
    excel: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    file: 'application/octet-stream',
  };

  down(url: string, type: 'excel' | 'file' = 'file'): Observable<boolean> {
    const msg: any = this.tip.msg('loading', '正在下载，请稍候...', {
      nzDuration: 0,
    });
    return new Observable((observer) => {
      observer.next(true);
      this.http
        .get(url, { responseType: 'blob', observe: 'response' })
        .subscribe(
          (res) => {
            const blob = new Blob([res.body], { type: this.blobType[type] }),
              fileName = decodeURIComponent(
                res.headers.get('Content-Disposition').split('filename=')[1]
              );
            // ie兼容处理
            if (window.navigator.msSaveBlob) {
              window.navigator.msSaveBlob(blob, fileName);
            } else {
              const link = document.createElement('a');
              link.setAttribute('href', window.URL.createObjectURL(blob));
              link.setAttribute('download', decodeURIComponent(fileName));
              link.style.visibility = 'hidden';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
            this.tip.msgRemove(msg.messageId);
            observer.next(false);
            observer.complete();
          },
          (error) => {
            this.tip.msgRemove(msg.messageId);
            observer.next(false);
            observer.complete();
          }
        );
    });
  }
}
