import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessComponent } from './access/access.component';
import { Error403Component } from './error403/error403.component';
import { Error404Component } from './error404/error404.component';
import { Error500Component } from './error500/error500.component';


const routes: Routes = [
  {path: '', redirectTo: '404', pathMatch: 'full'},
	{path: '403', component: Error403Component},
	{path: '404', component: Error404Component},
	{path: '500', component: Error500Component},
	{path: 'access', component: AccessComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }
