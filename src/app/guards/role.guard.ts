import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRole = route.data['role'];
    const currentUser = this.authService.currentUserValue;

    if (currentUser && currentUser.role === requiredRole) {
      return true;
    }

    // Rediriger vers le tableau de bord approprié en fonction du rôle de l'utilisateur
    if (currentUser) {
      switch (currentUser.role) {
        case 'admin':
          this.router.navigate(['/admin-dashboard']);
          break;
        case 'organizer':
          this.router.navigate(['/organizer-dashboard']);
          break;
        case 'client':
          this.router.navigate(['/client-dashboard']);
          break;
        default:
          this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/login']);
    }

    return false;
  }
} 