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

	getEmailError(): String {
		if (this.loginForm.get("email")?.errors?.["email"]) {
			return "Invalid email address";
		}
		else if (this.loginForm.get("email")?.errors?.["required"]) {
			return "Please provide an email address";
		}
		
		return "An unknown error has occurred";
	}

	getPasswordError(): String {
		if (this.loginForm.get("password")?.errors?.["minlength"]) {
			return "Password must be at least 6 characters";
		}
		else if (this.loginForm.get("password")?.errors?.["required"]) {
			return "Please provide a password";
		}

		return "An unknown error has occurred";
	}
}
