import { Component, OnInit } from '@angular/core';
import { httpUtil } from 'src/app/common/ts/util/http.util';

@Component({
  selector: 'app-http',
  templateUrl: './http.component.html',
  styleUrls: ['./http.component.less']
})
export class HttpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
		//console.log(
		//	httpUtil.getHttpParam({
		//		test: undefined,
		//		page: 1,
		//		size: 10,
		//		test1: " 1 ",
		//		test2: " 1@_"
		//	})
		//);
  }

}
