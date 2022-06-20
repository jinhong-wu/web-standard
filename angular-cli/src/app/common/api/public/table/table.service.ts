import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpClient) { }

	// 表格数据
	tableData(params: any) {
		return this.http.get<any>('url...', {params});
	}
	// 表格数据-测试
	test(params: any) {
		return this.http.post<any>('url...', {params});
	}
	// 表格数据-新增
	create(params: any) {
		return this.http.post<any>('url...', {params});
	}
}
