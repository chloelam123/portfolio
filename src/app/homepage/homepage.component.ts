import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  subjects = 'things';

  constructor() {
    setTimeout(() => {
      this.subjects = 'mobile apps';
    }, 1000);
    setTimeout(() => {
      this.subjects = 'websites';
    }, 2000);
    setTimeout(() => {
      this.subjects = 'webapps';
    }, 3000);
    setTimeout(() => {
      this.subjects = 'web design';
    }, 4000);
  }
}
