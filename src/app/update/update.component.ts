/* 
webApplicationDevelopment - assignmetn1
Student Name: Li Ying Lam
Student ID:301246753 
Date: Jul 6 2023 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  // Component properties
  updateForm: FormGroup;
  selectedContact: any;
  userId: string; // This should hold the contact details to be updated

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.id; // Add "this." prefix
    this.initializeForm();
    this.fetchContactDetails();
  }

  initializeForm(): void {
    // Initialize the form with form controls and validators
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      contactNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  fetchContactDetails(): void {
    // Fetch the contact details from the server based on the contact ID // Retrieve the contact ID from the AuthService
    // Make an HTTP request to fetch the contact details
    this.http
      .get<any>(
        `https://profoliobackend.azurewebsites.net/portfolio/users/${this.userId}`
      )
      .subscribe((response) => {
        this.selectedContact = (response as any)?.data.user; // Assuming the fetched data is
        // Prepopulate the form fields with the fetched contact details
        this.updateForm.patchValue({
          name: this.selectedContact.name,
          contactNumber: this.selectedContact.phone,
          email: this.selectedContact.email,
        });
      });
  }

  updateContact(): void {
    // Perform the contact update based on the form submission
    if (this.updateForm.valid) {
      const updatedContact = {
        name: this.updateForm.get('name').value,
        phone: this.updateForm.get('contactNumber').value,
        email: this.updateForm.get('email').value,
      };
      // Make an HTTP request to update the contact details
      this.http
        .patch<any>(
          `https://profoliobackend.azurewebsites.net/portfolio/users/${this.userId}`,
          updatedContact
        )
        .subscribe(
          (response) => {
            // Handle the success response
            console.log('Contact updated successfully');
            // Redirect to the desired page or perform any other necessary actions
            this.router.navigate(['/admin']);
          },
          (error) => {
            // Handle the error response
            console.log('Contact update failed:', error);
          }
        );
    } else {
      // Handle form validation errors if needed
      console.log('Invalid form data');
    }
  }
  cancel(): void {
    this.router.navigate(['/admin']);
  }
}
