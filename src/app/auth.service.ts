import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private token: BehaviorSubject<string> = new BehaviorSubject<string>('');
  userId: string = '';
  private apiUrl = 'http://localhost:3000/portfolio/users';
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();
  public token$ = this.token.asObservable();

  constructor(private http: HttpClient) {}

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    // return this.isLoggedInSubject.getValue();
    return localStorage.getItem('token') !== null;
  }

  //set the login/logout status
  // setLoggedIn(value: boolean): void {
  //   // this.isLoggedInSubject.next(value);
  //   localStorage.getItem('token');
  // }

  setLoggedOut(): void {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    // this.token.next(value);
    // save to localstorage
    localStorage.setItem('token', token);
    this.isLoggedInSubject.next(true);
  }

  //login method
  login(name: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { name, password });
  }

  getUser() {
    console.log(`Bearer ${this.token.getValue()}`);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token.getValue()}`,
    });

    return this.http.get('http://localhost:3000/portfolio/users', { headers });
  }

  setUserId(id: string): void {
    this.userId = id;
  }
  getUserId(): string {
    return this.userId;
  }
}
