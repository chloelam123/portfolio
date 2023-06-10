import { Component } from '@angular/core';
import {
  faCode,
  faMobileScreenButton,
  faWindowMaximize,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent {
  faCode = faCode;
  faMobileScreenButton = faMobileScreenButton;
  faWindowMaximize = faWindowMaximize;
}
