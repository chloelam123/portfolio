import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SortContactsPipe } from '../sort-contact.pipes';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  contacts: any[] = [];

  token: string = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    // this.authService.token$.subscribe((token) => {
    this.token = authService.getToken();

    // });
  }
  redirectToUpdate(userId: string): void {
    this.router.navigate(['/updateUser', userId]);
  }
  redirectToDelete(userId: string): void {
    this.router.navigate(['/deleteUser', userId]);
  }

  ngOnInit(): void {
    this.authService.token$.subscribe((token) => {
      // this.token = token;
      this.token = this.authService.getToken();
      this.fetchContacts();
    });
  }

  getToken() {
    console.log(`get uesrs`);
    // const token = 'your-auth-token'; // Replace with your actual authentication token

    console.log(this.token);
    this.authService.getUser().subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  fetchContacts() {
    const token = this.token; // Replace with your actual token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .get<any>('https://profoliobackend.azurewebsites.net/portfolio/users', {
        headers,
      })
      .subscribe(
        (response) => {
          const userData = response.data.users;
          // Process the userData as needed
          // Assign the processed data to the contacts property
          this.contacts = userData;
          console.log(this.contacts);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
