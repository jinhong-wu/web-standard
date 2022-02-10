import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
	HttpResponseBase,
	HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { httpUtil } from '../ts/util/http.util';
import { Router } from '@angular/router';
import { TipService } from '../service/tip/tip.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(
		private router: Router,
		private tip: TipService,
	) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 统一加上服务端前缀，前缀配置在environments文件夹下的文件内
    let url = request.url;
		if (!url.startsWith('https://') && !url.startsWith('http://') && !url.startsWith('assets')) {
			//url = environment.SERVER_URL + url;
		}

		// 去除body-params无效值
		let body = request.body;
		if (body) {
			body = httpUtil.paramsFn(body);
		}

		let newReq = request.clone({
			url: url,
			body: body,
			withCredentials: false,
		});

    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
        // 允许统一对请求错误处理
        if (event instanceof HttpResponseBase) {
          return this.handleData(event);
        }
        // 若一切都正常，则后续操作
        return of(event);
      }),
      catchError((err: HttpErrorResponse) =>  {
        return this.handleData(err)
      }),
    );
  }

	private handleData(ev: HttpResponseBase): Observable<any> {
		switch (ev.status) {
			case 400:
			case 404:
			case 500:
				if (ev instanceof HttpErrorResponse) {
					this.tip.notify('error', ev.error.message, ev.error.details);
          return throwError({ ev });
        }
        break;
      case 302:
				this.router.navigate([ev.headers.get('location')]);
        break;
      case 401:
        break;
      case 403:
        break;
      default:
				if (ev instanceof HttpErrorResponse) {
          this.tip.notify('error', '未知错误', ev.error.details);
          return throwError(ev);
        }
        break;
    }
    return of(ev);
	}

}
