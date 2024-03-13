import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { moviedbConfig } from '../models/moviedb.models';

@Injectable({
  	providedIn: 'root'
})
export class MovieService {
	headers;

  	constructor(private http: HttpClient) { 
		this.headers = new HttpHeaders()
			.set("accept", "application/json")
			.set("Authorization", "Bearer " + moviedbConfig.apiToken);
  	}

	private getMovies(page: string, callback: Function) {
		this.http.get("https://api.themoviedb.org/3/movie/" + page, {headers: this.headers}).subscribe({
			next: (data) => {
				callback(JSON.stringify(data));
			},
			error: (error) => {

			}
		});
	}

	getTrendingMovies(callback: Function) {
		this.getMovies("popular", callback);
	}

	getUpcomingMovies(callback: Function) {
		this.getMovies("upcoming", callback);
	}
}
