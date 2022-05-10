import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './common/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // 公共示例
      {
        path: 'public',
        loadChildren: () =>
          import('./pages/public/public.module').then(
            (modal) => modal.PublicModule
          ),
      },
      {
        path: '**',
        redirectTo: 'public',
        pathMatch: 'full',
      },
    ],
  },
	{
    path: 'error',
    loadChildren: () => import('./pages/error/error.module').then(modal => modal.ErrorModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
