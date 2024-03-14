import { Component } from '@angular/core';
import { ErrorService } from '../../services/error.service';

@Component({
  	selector: 'app-error',
  	standalone: true,
  	imports: [],
  	templateUrl: './error.component.html',
  	styleUrl: './error.component.css'
})
export class ErrorComponent {
	marginTop = "1em";

	constructor(public errorService: ErrorService) {}
}
