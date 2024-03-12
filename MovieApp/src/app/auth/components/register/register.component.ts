import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		RouterModule,
		CommonModule
  	],
  	templateUrl: './register.component.html',
  	styleUrl: '../auth.component.css'
})
export class RegisterComponent {

	constructor(private authService: AuthService) { }

	loading = false;
	error: string | void = "";

	registerForm = new FormGroup({
		email: new FormControl("", [Validators.required, Validators.email]),
		password: new FormControl("", [Validators.required, Validators.minLength(6)])
	});

	async onSubmit() {
		this.loading = true;
		this.error = "";

		const {email, password} = this.registerForm.value;
		this.error = await this.authService.register(email!, password!);

		this.loading = false;
	}

	getEmailError(): String {
		if (this.registerForm.get("email")?.errors?.["email"]) {
			return "Invalid email address";
		}
		else if (this.registerForm.get("email")?.errors?.["required"]) {
			return "Please provide an email address";
		}
		
		return "An unknown error has occurred";
	}

	getPasswordError(): String {
		if (this.registerForm.get("password")?.errors?.["minlength"]) {
			return "Password must be at least 6 characters";
		}
		else if (this.registerForm.get("password")?.errors?.["required"]) {
			return "Please provide a password";
		}

		return "An unknown error has occurred";
	}
}