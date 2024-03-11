import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
	ReactiveFormsModule,
	RouterModule
],
  templateUrl: './register.component.html',
  styleUrl: '../auth.component.css'
})
export class RegisterComponent {
	registerForm = new FormGroup({
		email: new FormControl("", [Validators.required, Validators.email]),
		password: new FormControl("", [Validators.required, Validators.minLength(6)])
	});

	onSubmit() {
		
	}
}