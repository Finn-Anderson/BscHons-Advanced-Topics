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

	getTrendingMovies(callback: Function) {
		this.http.get("https://api.themoviedb.org/3/movie/popular", {headers: this.headers}).subscribe((res) => {
			callback(JSON.stringify(res));
		});
	}

	getUpcomingMovies(callback: Function) {
		this.http.get("https://api.themoviedb.org/3/movie/upcoming", {headers: this.headers}).subscribe((res) => {
			callback(JSON.stringify(res));
		});
	}
}
