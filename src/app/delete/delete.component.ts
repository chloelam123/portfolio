import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent implements OnInit {
  selectedContact: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.fetchContactDetails();
  }

  fetchContactDetails(): void {
    const contactId = this.route.snapshot.params.id;
    this.http
      .get<any>(
        `https://profoliobackend.azurewebsites.net/portfolio/users/${contactId}`
      )
      .subscribe((response) => {
        this.selectedContact = (response as any)?.data.user;
      });
  }

  deleteContact(): void {
    const contactId = this.route.snapshot.params.id;
    this.http
      .delete<any>(
        `https://profoliobackend.azurewebsites.net/portfolio/users/${contactId}`
      )
      .subscribe(
        (response) => {
          console.log('Contact deleted successfully');
          this.router.navigate(['/admin']);
        },
        (error) => {
          console.log('Contact deletion failed:', error);
        }
      );
  }
  cancel(): void {
    this.router.navigate(['/admin']);
  }
}
