import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassComponent } from './class/class.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
	{
    path: "",
    redirectTo: "table",
    pathMatch: "full",
  },
	// 表格
	{
		path: "table",
		component: TableComponent,
	},
	// 样式
	{
		path: "class",
		component: ClassComponent,
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
