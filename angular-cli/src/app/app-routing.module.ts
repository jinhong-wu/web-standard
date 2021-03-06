import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './common/layout/layout.component';

const routes: Routes = [
	{
    path: 'error',
    loadChildren: () => import('./pages/error/error.module').then(modal => modal.ErrorModule)
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      // 公共示例
      {
        path: 'public',
        loadChildren: () => import('./pages/public/public.module').then((modal) => modal.PublicModule),
      },
			// 插件配置
      {
        path: 'config',
        loadChildren: () => import('./pages/config/config.module').then((modal) => modal.ConfigModule),
      },
      {
        path: '**',
        redirectTo: 'public',
        pathMatch: 'full',
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
