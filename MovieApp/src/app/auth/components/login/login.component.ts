import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  	selector: 'app-login',
  	standalone: true,
  	imports: [
		ReactiveFormsModule,
		RouterModule,
		CommonModule
	],
  	templateUrl: './login.component.html',
  	styleUrl: '../auth.component.css'
})
export class LoginComponent {

	constructor(private authService: AuthService) { };

	loading = false;
	error: string | void = "";

	loginForm = new FormGroup({
		email: new FormControl("", [Validators.required, Validators.email]),
		password: new FormControl("", [Validators.required, Validators.minLength(6)])
	});

	async onSubmit() {
		this.loading = true;
		this.error = "";

		const {email, password} = this.loginForm.value;
		this.error = await this.authService.login(email!, password!);

		this.loading = false;
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
}
