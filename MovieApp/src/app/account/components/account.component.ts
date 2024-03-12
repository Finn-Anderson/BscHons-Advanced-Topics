import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  	selector: 'app-account',
  	standalone: true,
  	imports: [],
  	templateUrl: './account.component.html',
  	styleUrl: './account.component.css'
})
export class AccountComponent {
	constructor(private authService: AuthService) {}

	onLogout() {
		this.authService.logout();
	}
}
