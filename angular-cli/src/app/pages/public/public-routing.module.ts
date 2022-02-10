import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassComponent } from './class/class.component';
import { FormComponent } from './form/form.component';
import { HttpComponent } from './http/http.component';
import { InputComponent } from './input/input.component';
import { MenuComponent } from './menu/menu.component';
import { ModalComponent } from './modal/modal.component';
import { PipeComponent } from './pipe/pipe.component';
import { TableComponent } from './table/table.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
	{ path: "", redirectTo: "table", pathMatch: "full" },
	// 菜单
	{ path: "menu", component: MenuComponent }, 
	// 表格
	{ path: "table", component: TableComponent }, 
	// 表单
	{ path: "form", component: FormComponent },
	// 样式
	{ path: "class", component: ClassComponent },
	// 弹出框
	{ path: "modal", component: ModalComponent },
	// 上传/下载
	{ path: "upload", component: UploadComponent },
	// http
	{ path: "http", component: HttpComponent },
	// input
	{ path: "input", component: InputComponent },
	// pipe
	{ path: "pipe", component: PipeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
