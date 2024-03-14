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

	private getMovies(page: string, callback: Function, errorCallback: Function) {
		this.http.get("https://api.themoviedb.org/3/movie/" + page + "?region=GB", {headers: this.headers}).subscribe({
			next: (data) => {
				callback(JSON.stringify(data));
			},
			error: (error) => {
				errorCallback(page);
			}
		});
	}

	getTrendingMovies(callback: Function, errorCallback: Function) {
		this.getMovies("popular", callback, errorCallback);
	}

	getUpcomingMovies(callback: Function, errorCallback: Function) {
		this.getMovies("upcoming", callback, errorCallback);
	}

	searchForMovie(name: string, pageNum: number, callback: Function, errorCallback: Function) {
		this.http.get("https://api.themoviedb.org/3/search/movie?query=" + name + "&region=GB&page=" + pageNum, {headers: this.headers}).subscribe({
			next: (data) => {
				callback(JSON.stringify(data));
			},
			error: (error) => {
				errorCallback(name);
			}
		});
	}

	getMovieDetails(id: number, callback: Function, errorCallback: Function) {
		this.http.get("https://api.themoviedb.org/3/movie/" + id, {headers: this.headers}).subscribe({
			next: (data) => {
				callback(JSON.stringify(data));
			},
			error: (error) => {
				errorCallback();
			}
		});
	}

	getMovieReleaseDate(id: number, callback: Function, errorCallback: Function) {
		this.http.get("https://api.themoviedb.org/3/movie/" + id + "/release_dates", {headers: this.headers}).subscribe({
			next: (data) => {
				callback(JSON.stringify(data));
			},
			error: (error) => {
				errorCallback();
			}
		});
	}
}
