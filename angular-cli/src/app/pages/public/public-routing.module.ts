import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListGuard } from 'src/app/common/guard/list.guard';
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
	{ path: '', redirectTo: 'other', pathMatch: 'full', canActivate: [ListGuard] },
	// 规范
	{ path: 'other', component: OtherComponent, canActivate: [ListGuard] },
	// ts-base
	{ path: 'ts/base', component: BaseComponent, canActivate: [ListGuard] },
	// ts-util
	{ path: 'ts/util', component: UtilComponent, canActivate: [ListGuard] },
	// 菜单
	{ path: 'menu', component: MenuComponent, canActivate: [ListGuard] },
	// 表格
	{ path: 'table', component: TableComponent, canActivate: [ListGuard] },
	// 树
	{ path: 'tree', component: TreeComponent, canActivate: [ListGuard] },
	// 表单
	{ path: 'form', component: FormComponent, canActivate: [ListGuard] },
	// 样式
	{ path: 'class', component: ClassComponent, canActivate: [ListGuard] },
	// 弹出框
	{ path: 'modal', component: ModalComponent, canActivate: [ListGuard] },
	// 上传/下载
	{ path: 'upload', component: UploadComponent, canActivate: [ListGuard] },
	// input
	{ path: 'input', component: InputComponent, canActivate: [ListGuard] },
	// select
	{ path: 'select', component: SelectComponent, canActivate: [ListGuard] },
	// service
	{ path: 'service', component: ServiceComponent, canActivate: [ListGuard] },
	// pipe
	{ path: 'pipe', component: PipeComponent, canActivate: [ListGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
