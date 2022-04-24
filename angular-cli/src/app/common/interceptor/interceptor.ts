import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponseBase,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { HttpUtilTs } from '../ts/util/http.util';
import { Router } from '@angular/router';
import { TipService } from '../service/tip.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

	errorMessage = {
    "400":{
      'zh':{
        title:'失败',
        content:'当前请求携带参数过长，请使用合理的查询参数',
      },
      'en':{
        title:'FAILED',
        content:"The param of Current Request's length is too long, please use valid query param",
      }
    }
  }

  private get tip(): TipService {
    return this.injector.get(TipService);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // 统一加上服务端前缀，前缀配置在environments文件夹下的文件内
    let url = request.url;
    if (
      !url.startsWith('https://') &&
      !url.startsWith('http://') &&
      !url.startsWith('assets')
    ) {
      //url = environment.SERVER_URL + url;
    }

    // 去除body-params无效值
    let body = request.body;
    if (body) {
      body = HttpUtilTs.paramsFn(body);
    }

    let newReq = request.clone({
      url: url,
      body: body,
      withCredentials: false,
    });

    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
        if (event instanceof HttpResponseBase) {
          return this.handleData(event, request.headers.has('ignoreTip'));
        }
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => {
        return this.handleData(err, request.headers.has('ignoreTip'));
      })
    );
  }

  // ignoreTip：忽略拦截器的提示信息
  private handleData(
    ev: HttpResponseBase,
    ignoreTip: boolean = false
  ): Observable<any> {
    switch (ev.status) {
      case 302:
        this.goTo(ev.headers.get('location'));
        break;
      case 400:
        if (ev instanceof HttpErrorResponse) {
          if (!ignoreTip) {
            this.tip.notify('error', ev.error.message, ev.error.details);
          }
          return throwError(ev);
        }
      case 401:
        break;
      case 404:
				if (ev instanceof HttpErrorResponse) {
          if(!ignoreTip){
            // 当前请求为400时，且ev.error对象为string，此时为浏览器报出的URL超长错误。
            if(typeof ev.error === 'string') {
              const lang = window.sessionStorage.getItem("lang")
              this.tip.notify('error', this.errorMessage["400"][lang].title, this.errorMessage["400"][lang].content);
            } else {
              this.tip.notify('error', ev.error.message, ev.error.message);
            }
          }
          return throwError(ev);
        }
        break;
      case 500:
        if (ev instanceof HttpErrorResponse) {
          if (!ignoreTip) {
            this.tip.notify('error', ev.error.message, ev.error.message);
          }
          return throwError({ ev });
        }
        break;
      default:
        if (ev instanceof HttpErrorResponse) {
          if (!ignoreTip) {
            this.tip.notify('error', '未知错误', ev.error.details);
          }
          return throwError(ev);
        }
        break;
    }
    return of(ev);
  }

  private goTo(url: string) {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }
}
