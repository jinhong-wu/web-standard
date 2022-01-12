import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error403Component } from './error403/error403.component';
import { Error404Component } from './error404/error404.component';
import { Error500Component } from './error500/error500.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: Error404Component},
      {path: '404', component: Error404Component},
      {path: '403', component: Error403Component},
      {path: '500', component: Error500Component}]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }
