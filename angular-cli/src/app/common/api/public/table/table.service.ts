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
}
