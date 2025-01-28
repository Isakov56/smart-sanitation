import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth-service/auth-service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles = route.data['role'] as string;
    const requiredPermission = route.data['role'] as string;
    const userRoles = this.authService.getUserRoles(expectedRoles);

    console.log('Required Roles:', expectedRoles, requiredPermission);
    console.log('Has Permission:', userRoles);

    if (!userRoles) {
      this.router.navigate(['/unauthorized']);
      console.log('Access denied');
      return false;
    }
  
    console.log('Access granted');
    return true;
  }
}
