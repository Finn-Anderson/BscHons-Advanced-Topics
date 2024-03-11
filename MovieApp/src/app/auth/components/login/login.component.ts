import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
	ReactiveFormsModule,
	RouterModule
],
  templateUrl: './login.component.html',
  styleUrl: '../auth.component.css'
})
export class LoginComponent {
	loginForm = new FormGroup({
		email: new FormControl("", [Validators.required, Validators.email]),
		password: new FormControl("", [Validators.required, Validators.minLength(6)])
	});

	onSubmit() {
		
	}
}
