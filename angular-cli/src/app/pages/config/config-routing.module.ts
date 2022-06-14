import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListGuard } from 'src/app/common/guard/list.guard';
import { EchartsComponent } from './echarts/echarts.component';
import { I18nComponent } from './i18n/i18n.component';
import { PdfComponent } from './pdf/pdf.component';

const routes: Routes = [
	{ path: '', redirectTo: 'i18n', pathMatch: 'full', canActivate: [ListGuard] },
	// 国际化
	{ path: 'i18n', component: I18nComponent, canActivate: [ListGuard] },
	// ECharts
	{ path: 'echarts', component: EchartsComponent, canActivate: [ListGuard] },
	// PDF
	{ path: 'pdf', component: PdfComponent, canActivate: [ListGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule { }
