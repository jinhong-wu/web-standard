import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorRoutingModule } from './error-routing.module';
import { NzResultModule } from 'ng-zorro-antd/result';

import { Error403Component } from './error403/error403.component';
import { Error404Component } from './error404/error404.component';
import { Error500Component } from './error500/error500.component';


@NgModule({
  declarations: [
		Error403Component, 
		Error404Component, 
		Error500Component
	],
  imports: [
    CommonModule,
    ErrorRoutingModule,
		NzResultModule
  ],
  exports: [ 
		Error403Component, 
		Error500Component, 
		Error404Component
	]
})
export class ErrorModule { }
