import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassComponent } from './class/class.component';
import { FormComponent } from './form/form.component';
import { InputComponent } from './input/input.component';
import { MenuComponent } from './menu/menu.component';
import { ModalComponent } from './modal/modal.component';
import { OtherComponent } from './other/other.component';
import { PipeComponent } from './pipe/pipe.component';
import { SelectComponent } from './select/select.component';
import { ServiceComponent } from './service/service.component';
import { TableComponent } from './table/table.component';
import { TreeComponent } from './tree/tree.component';
import { BaseComponent } from './ts/base/base.component';
import { UtilComponent } from './ts/util/util.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  { path: '', redirectTo: 'other', pathMatch: 'full' },
  // 规范
  { path: 'other', component: OtherComponent },
	// ts-base
	{ path: 'ts/base', component: BaseComponent },
	// ts-util
	{ path: 'ts/util', component: UtilComponent },
  // 菜单
  { path: 'menu', component: MenuComponent },
  // 表格
  { path: 'table', component: TableComponent },
  // 树
  { path: 'tree', component: TreeComponent },
  // 表单
  { path: 'form', component: FormComponent },
  // 样式
  { path: 'class', component: ClassComponent },
  // 弹出框
  { path: 'modal', component: ModalComponent },
  // 上传/下载
  { path: 'upload', component: UploadComponent },
  // input
  { path: 'input', component: InputComponent },
  // select
  { path: 'select', component: SelectComponent },
  // service
  { path: 'service', component: ServiceComponent },
  // pipe
  { path: 'pipe', component: PipeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
