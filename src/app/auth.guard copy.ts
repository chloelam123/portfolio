// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from './auth.service';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(): boolean {
//     if (this.authService.isAuthenticated()) {
//       return true; // User is authenticated, allow access to the secure area
//     } else {
//       this.router.navigate(['/login']); // Redirect to the login view
//       return false; // Prevent access to the secure area
//     }
//   }
// }
