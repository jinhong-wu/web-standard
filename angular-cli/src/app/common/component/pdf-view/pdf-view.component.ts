import { Component, Input, OnChanges } from '@angular/core';
import { environment } from 'src/environments/environment';
/**
 * @name pdf预览
 * @param url API地址
*/
@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.less']
})
export class PdfViewComponent implements OnChanges {

  @Input() url : string = '';
  srcUrl: any;

  constructor() {}

  ngOnChanges(changes):void {
    if (changes.url) {
			this.srcUrl = {
				url: environment.SERVER_URL + this.url,
				withCredentials: false,
				httpHeaders: { 'Authorization': environment.TOKEN },
			};
    }
  }

}
