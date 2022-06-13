import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MenuService } from '../service/system/menu.service';

@Injectable({
  providedIn: 'root'
})
export class ListGuard implements CanActivate {

  constructor(
    private router: Router,
    private MenuService: MenuService
  ) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
		let menuLoaded = await this.menuLoaded();
		if (menuLoaded) {
			let url = state.url.split("?")[0],  // 去掉url传参
      menu = this.MenuService.menuObject[url];
			if (menu) {
				if (menu.node.linkPath && (menu.node.linkPath != url)) {
					this.router.navigate([menu.node.linkPath]);
					return false;
				};
			} else {
				// 目录不存在：取目录对应的一级路由
				let firstUrl = "/" + url.split("/")[1],
				firstUrlNode: any = this.MenuService.menuObject[firstUrl];
				if (firstUrlNode) {
					this.router.navigate([firstUrlNode.node.linkPath]);
				} else {
					this.router.navigate([this.MenuService.menuList?.[0].node.linkPath]);
				};
				return false;
			}
			return true;
		}
  }

	menuLoaded(): Promise<boolean> {
    return new Promise((resolve, reject) => {
			let timer = setInterval(() => {
				if (!this.MenuService.menuLoading) {
					clearInterval(timer);
					resolve(true);
				}
			}, 50);
    });
  }

}
