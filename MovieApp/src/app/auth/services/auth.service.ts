import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { SubscriptionsService } from '../../account/services/subscriptions.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

  	constructor(private auth: AngularFireAuth, private router: Router, private subscriptionsService: SubscriptionsService) { }

  	register(email: string, password: string): Promise<string | void> {
		return this.auth.createUserWithEmailAndPassword(email, password)
			.then(res => {
				res.user?.getIdToken(false).then(token => {
					let authToken = token

					let subscriptions = JSON.stringify({netflix: false, sky: false, now: false, amazon: false, disney: false});
					this.subscriptionsService.storeSubscriptions(subscriptions, res.user?.uid, authToken);

					this.router.navigate(['']);
				}) 
			})
			.catch(error => {
				if(error.code == "auth/email-already-in-use") {
					return "An account already uses this email";
				}
				else if (error.code == "auth/invalid-email") {
					return "Invalid email address";
				}

				return "An unknown error has occurred, please try again later"
			});
  	}

	login(email: string, password: string): Promise<string | void> {
		return this.auth.signInWithEmailAndPassword(email, password)
			.then(res => {
				this.router.navigate(['']);
			})
			.catch(error => {
				if(error.code == "auth/user-not-found") {
					return "No account uses this email adress";
				}
				else if (error.code == "auth/wrong-password" || error.code == "auth/invalid-credential") {
					return "Incorrect email/password";
				}

				return "An unknown error has occurred, please try again later"
			});
	}

	logout() {
		this.auth.signOut();
		this.router.navigate([""]);
	}
}
