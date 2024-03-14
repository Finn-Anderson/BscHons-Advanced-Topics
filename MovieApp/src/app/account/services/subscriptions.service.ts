import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
 	providedIn: 'root'
})
export class SubscriptionsService {
  	constructor(private http: HttpClient) { }

  	storeSubscriptions(subscriptions: string, userID: string | undefined, authToken: any, errorCallback?: Function) {
    	this.http.put("https://bschons-advanced-topics-default-rtdb.europe-west1.firebasedatabase.app/subscriptions/" + userID + ".json", subscriptions, {params: {"auth": authToken}}).subscribe({
			error: (error) => {
				errorCallback!("set");
			}
		});
  	}

	getSubscriptions(userID: string | undefined, authToken: any, callback: Function, errorCallback: Function) {
		this.http.get("https://bschons-advanced-topics-default-rtdb.europe-west1.firebasedatabase.app/subscriptions/" + userID + ".json", {params: {"auth": authToken}}).subscribe({
			next: (data) => {
				callback(JSON.stringify(data));
			},
			error: (error) => {
				errorCallback("get");
			}
		})
	}
}
