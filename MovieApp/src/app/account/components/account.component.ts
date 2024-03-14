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
	authToken: any;
	errorMsg = "";

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
			if (this.userID) {
				user?.getIdToken(false).then(token => {
					this.authToken = token;

					this.subscriptionsService.getSubscriptions(this.userID, this.authToken, this.setValues.bind(this), this.errorCallback.bind(this));
				})
			}
		})
	}

	setValues(stringify: string) {
		if (stringify == "null") {
			return;
		}

		var parse = JSON.parse(stringify);

		this.subscriptionForm.setValue(parse);
	}

	onSubmit() {
		let serializedForm = JSON.stringify(this.subscriptionForm.getRawValue());
		this.subscriptionsService.storeSubscriptions(serializedForm, this.userID, this.authToken, this.errorCallback.bind(this));
	}

	errorCallback(direction: string) {
		if (direction == "get") {
			this.errorMsg = "Failed to get subscriptions from database. Please try again later.";
		}
		else {
			this.errorMsg = "Failed to save subscriptions to database. Please try again later.";
		}
	}

	onLogout() {
		this.authService.logout();
	}
}
