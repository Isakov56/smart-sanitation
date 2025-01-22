import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth-service/auth-service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredPermission = route.data['permission'] as string;
    const hasPermission = this.authService.hasPermission(requiredPermission);
  
    console.log('Required Permission:', requiredPermission);
    console.log('Has Permission:', hasPermission);
  
    if (!hasPermission) {
      this.router.navigate(['/unauthorized']);
      console.log('Access denied');
      return false;
    }
  
    console.log('Access granted');
    return true;
  }
}
