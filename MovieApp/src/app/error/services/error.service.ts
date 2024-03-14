import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ErrorService {
	message = "Error 404 - Page not found";
}
