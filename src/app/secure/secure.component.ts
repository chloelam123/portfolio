import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css'],
})
export class SecureComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Check if the user is authenticated
    const isAuthenticated = this.authService.isAuthenticated();

    if (!isAuthenticated) {
      // User is not authenticated, redirect to the login view
      this.router.navigate(['/login']);
    }
  }
}
