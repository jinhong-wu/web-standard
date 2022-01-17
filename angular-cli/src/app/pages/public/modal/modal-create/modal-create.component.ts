import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.less']
})
export class ModalCreateComponent implements OnInit {

  constructor(
		public nzModal: NzModalRef
	) { }
	
	formLoading = false;

  ngOnInit(): void {
		
  }

}
