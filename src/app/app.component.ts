import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // Set it to true if the user is logged in
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    // this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
    //   this.isLoggedIn = isLoggedIn;
    // });
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    // this.isLoggedIn = authService.isAuthenticated();
  }

  //logout
  logout() {
    this.authService.setLoggedOut();
    // localStorage.clear();
    // this.router.navigate(['/admin']);
  }
  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();
  }
}
