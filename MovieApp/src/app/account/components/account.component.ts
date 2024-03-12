import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { SubscriptionsService } from '../services/subscriptions.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  	selector: 'app-account',
  	standalone: true,
  	imports: [ReactiveFormsModule],
  	templateUrl: './account.component.html',
  	styleUrl: './account.component.css'
})
export class AccountComponent {
	userID!: string | undefined;

	subscriptionForm = new FormGroup({
		netflix: new FormControl(false),
		sky: new FormControl(false),
		now: new FormControl(false),
		amazon: new FormControl(false),
		disney: new FormControl(false)
	});;

	constructor(private authService: AuthService, private subscriptionsService: SubscriptionsService, private auth: AngularFireAuth) {
		this.auth.authState.subscribe(user => {
			this.userID = user ? user.uid : undefined;

			this.subscriptionsService.getSubscriptions(this.userID, this.setValues.bind(this));
		})
	}

	setValues(stringify: string) {
		var parse = JSON.parse(stringify);

		this.subscriptionForm.setValue(parse);
	}

	onSubmit() {
		let serializedForm = JSON.stringify(this.subscriptionForm.getRawValue());
		this.subscriptionsService.storeSubscriptions(serializedForm, this.userID);
	}

	onLogout() {
		this.authService.logout();
	}
}
