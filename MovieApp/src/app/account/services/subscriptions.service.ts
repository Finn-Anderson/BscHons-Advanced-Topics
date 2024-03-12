import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
 	providedIn: 'root'
})
export class SubscriptionsService {
  	constructor(private http: HttpClient) { }

  	storeSubscriptions(subscriptions: string, userID: string | undefined, authToken: any) {
    	this.http.put("https://bschons-advanced-topics-default-rtdb.europe-west1.firebasedatabase.app/subscriptions/" + userID + ".json", subscriptions, {params: {"auth": authToken}}).subscribe();
  	}

	getSubscriptions(userID: string | undefined, authToken: any, callback: Function) {
		this.http.get("https://bschons-advanced-topics-default-rtdb.europe-west1.firebasedatabase.app/subscriptions/" + userID + ".json", {params: {"auth": authToken}}).subscribe((res) => {
			callback(JSON.stringify(res));
		})
	}
}
