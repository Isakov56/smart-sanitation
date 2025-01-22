import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth-service/auth-service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles = route.data['roles'] as string[];
    const userRoles = this.authService.getUserRoles();

    const hasRole = expectedRoles.some(role => userRoles.includes(role));
    if (!hasRole) {
      this.router.navigate(['/unauthorized']); // Redirect to an unauthorized page
      return false;
    }
    return true;
  }
}
