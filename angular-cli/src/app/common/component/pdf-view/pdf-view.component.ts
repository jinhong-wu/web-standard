import { Component, ElementRef, Input, OnChanges } from '@angular/core';
import { environment } from 'src/environments/environment';
/**
 * @name pdf预览
 * @param src API地址
*/
@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.less']
})
export class PdfViewComponent implements OnChanges {

  constructor(public ElementRef: ElementRef) {}

  @Input() src : string = '';

  ngOnChanges(changes):void {
    if (changes.src) {
			let viewer = this.ElementRef.nativeElement.querySelector("#pdf_viewer"),	
			xhr = new XMLHttpRequest();
      xhr.open("GET", environment.SERVER_URL + this.src + '#toolbar=0');
      xhr.responseType = "blob";
      xhr.setRequestHeader('Authorization', environment.TOKEN);
			xhr.setRequestHeader('X-Frame-Options', 'SAMEORIGIN');
      xhr.onreadystatechange = () => {
        if (xhr.readyState === xhr.DONE) {
          if (xhr.status === 200) {
            viewer.src = URL.createObjectURL(xhr.response);
          }
        }
      };
      xhr.send();
    }
  }

}
