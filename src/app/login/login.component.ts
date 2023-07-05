import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import jwt_decode from 'jwt-decode';

import {
  faKey,
  faFaceSmile,
  faLaptopHouse,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [],
})
export class LoginComponent implements OnInit {
  faKey = faKey;
  faFaceSmile = faFaceSmile;

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {}
  errorMessage: string = '';
  isLoggedIn: boolean = false;

  //login
  loginUser(event) {
    event.preventDefault();
    const target = event.target;
    const name = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;

    // this.Auth.getUserDetails(username, password);
    console.log(name, password);
    // Call the login method from the AuthService
    this.authService.login(name, password).subscribe(
      (response) => {
        // Handle successful login
        console.log('Login successful');
        console.log(response);
        console.log((response as any)?.token);
        this.authService.setLoggedIn(true);
        this.authService.setToken((response as any)?.token);
        this.router.navigate(['/admin']);
        const token = (response as any)?.token;
        console.log(token);
        const decodedToken = jwt_decode<any>(token);
        // console.log(decodedToken.id);
        // this.authService.setUserId(decodedToken.id);
        // this.authService.getUserId();
      },
      (error) => {
        console.log('Login error:', error);
        // Handle login error
        if (error.status === 401 && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = error.statusText;
          this.authService.setLoggedIn(false);
        }
      }
    );
  }
}
