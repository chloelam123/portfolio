import { Component } from '@angular/core';
import {
  faMobileRetro,
  faEnvelopeCircleCheck,
  faHomeUser,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  faMobileRetro = faMobileRetro;
  faEnvelopeCircleCheck = faEnvelopeCircleCheck;
  faHomeUser = faHomeUser;
}
