import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TipService } from './tip.service';
import { Observable } from 'rxjs';
import { I18nService } from './system/i18n.service';

interface options {
  type?: 'excel' | 'file';
  params?: HttpParams;
}

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  constructor(public http: HttpClient, public tip: TipService, public i18n: I18nService) {}

	loadI18n = {
		zh: "正在下载，请稍候...",
		en: "Downloading, please wait...",
	};

  blobType = {
    excel: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    file: 'application/octet-stream',
  };

  down(url: string, option: options = {}): Observable<boolean> {
    const msgId: any = this.tip.msg('loading', this.loadI18n[this.i18n.lang], {
      nzDuration: 0,
    }).messageId;
    return new Observable((observer) => {
      observer.next(true);
      this.http
        .get(url, {
          responseType: 'blob',
          observe: 'response',
          params: option?.params || null,
        }).subscribe((res) => {
					const blob = new Blob([res.body], {type: this.blobType[option.type || 'file']}),
						fileName = decodeURIComponent(res.headers.get('Content-Disposition').split('filename=')[1]);
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
					this.tip.msgRemove(msgId);
					observer.next(false);
					observer.complete();
				}, (error) => {
					this.tip.msgRemove(msgId);
					observer.next(false);
					observer.complete();
				}
			);
    });
  }

	downPost(url: string, reqbody): Observable<boolean> {
    const msgId: any = this.tip.msg('loading', this.loadI18n[this.i18n.lang], {
      nzDuration: 0,
    }).messageId;
    return new Observable((observer) => {
			observer.next(true);
			this.http.post(url, reqbody, {
				headers: new HttpHeaders({'Content-Type': "application/json; charset=utf-8"}),
				responseType: 'blob',
				observe: 'response'
			}).subscribe((res) => {
				let reader: any = new FileReader()
				reader.readAsText(res.body, 'utf-8')
				reader.addEventListener("loadend", () => {
					const blob = new Blob([res.body], {type: this.blobType.file}),
						fileName = decodeURIComponent(res.headers.get('Content-Disposition').split('filename=')[1]);
					if (window.navigator.msSaveBlob) {
						window.navigator.msSaveBlob(blob, fileName);
					} else {
						const link = document.createElement('a');
						link.setAttribute('href', window.URL.createObjectURL(blob));
						link.setAttribute('download',decodeURIComponent(fileName));
						link.style.visibility = 'hidden';
						document.body.appendChild(link);
						link.click();
						document.body.removeChild(link);
					}
					this.tip.msgRemove(msgId);
					observer.next(false);
					observer.complete();
				})
			}, (error) => {
				this.tip.msgRemove(msgId);
					observer.next(false);
					observer.complete();
			})
		});
  }
}
