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

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url = state.url.split("?")[0],
      menu = this.MenuService.menuObject[url];
    if (menu) {
      if (menu.node.linkPath && (menu.node.linkPath != url)) {
        this.router.navigate([menu.node.linkPath]);
        return false;
      };
      return true;
    } else {
      this.router.navigate([this.MenuService.menuList?.[0].node.linkPath]);
      return false;
    }
  }

}
