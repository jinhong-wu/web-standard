import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from "rxjs/operators";

@Component({
  selector: 'app-echarts',
  templateUrl: './echarts.component.html',
  styleUrls: ['./echarts.component.less']
})
export class EchartsComponent implements OnInit, OnDestroy {

  constructor() { }
	chartOption: any;
	chartResize: any = {};
	chartLoading = true;
  ngOnInit(): void {
		setTimeout(()=>{
			this.chartLoading = false;
			this.chartOption = {
				title: {
					text: 'ECharts 入门示例'
				},
				tooltip: {},
				xAxis: {
					data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
				},
				yAxis: {},
				series: [
					{
						name: '销量',
						type: 'bar',
						data: [5, 20, 36, 10, 10, 20]
					}
				]
			}
		}, 3000)
		//this.chartResize = fromEvent(window, "resize")
    //  .pipe(debounceTime(500))
    //  .subscribe(function () {
    //    this.chartOption?.resize();
    //  });
  }

	ngOnDestroy(): void {
		//this.chartResize?.unsubscribe();
	}

}
