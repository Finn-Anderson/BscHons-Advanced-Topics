import { Component } from '@angular/core';

@Component({
  	selector: 'app-error',
  	standalone: true,
  	imports: [],
  	templateUrl: './error.component.html',
  	styleUrl: './error.component.css'
})
export class ErrorComponent {
	errorMsg = "Error 404 - Page not found";
	marginTop = "1em";
}
