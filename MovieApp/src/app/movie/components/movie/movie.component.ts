import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  	selector: 'app-movie',
  	standalone: true,
  	imports: [],
  	templateUrl: './movie.component.html',
  	styleUrl: './movie.component.css'
})
export class MovieComponent {
	trendingHTML = "";
	upcomingHTML = "";
	
	constructor(private movieService: MovieService) {
		movieService.getTrendingMovies(this.displayTrendingMovies.bind(this));
		movieService.getUpcomingMovies(this.displayUpcomingMovies.bind(this));
	}

	displayTrendingMovies(stringify: string) {
		const parse = JSON.parse(stringify);

		for (const movie of parse["results"]) {
			var movieHTML = "<div><img width='300px' src='https://image.tmdb.org/t/p/w500" + movie["poster_path"] + "'></div>";

			this.trendingHTML = this.trendingHTML.concat(movieHTML);
		}
	}

	displayUpcomingMovies(stringify: string) {
		const parse = JSON.parse(stringify);

		//console.log(parse["results"]); Use later;

		for (const movie of parse["results"]) {
			var movieHTML = "<div><img width='300px' src='https://image.tmdb.org/t/p/w500" + movie["poster_path"] + "'></div>";

			this.upcomingHTML = this.upcomingHTML.concat(movieHTML);
		}
	}
}
