import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
 	providedIn: 'root'
})
export class SubscriptionsService {
  	constructor(private http: HttpClient) { }

  	storeSubscriptions(subscriptions: string, userID: string | undefined) {
    	this.http.put("https://bschons-advanced-topics-default-rtdb.europe-west1.firebasedatabase.app/" + userID + ".json", subscriptions).subscribe();
  	}

	getSubscriptions(userID: string | undefined, callback: Function) {
		this.http.get("https://bschons-advanced-topics-default-rtdb.europe-west1.firebasedatabase.app/" + userID + ".json").subscribe((res) => {
			callback(JSON.stringify(res));
		})
	}
}
