import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-control-info',
  templateUrl: './form-control-info.component.html',
  styleUrls: ['./form-control-info.component.less']
})
/**
 * @name 表单-规则说明
 * @param tooltip 规则说明，必传
 * @example
  <app-form-control-info [tooltip]=""></app-form-control-info>
*/
export class FormControlInfoComponent implements OnInit {

	constructor() {}

	@Input() tooltip: string = '';

	ngOnInit() {}
}
