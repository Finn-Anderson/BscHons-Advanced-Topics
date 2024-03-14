import { Component, ViewEncapsulation } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../../error/components/error/error.component';
import { ErrorService } from '../../../error/services/error.service';

@Component({
	selector: 'app-moviedetails',
	standalone: true,
	imports: [ErrorComponent, CommonModule],
	templateUrl: './moviedetails.component.html',
	styleUrls: ['./moviedetails.component.css', '../globalmovie.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class MovieDetailsComponent {
	private routeSub!: Subscription;
	loading = true;
	hide = {error: true, movie: true};
	details = {poster: "", title: "", description: "", rating: "", genres: "<b>Genres:</b> ", release_date: "", runtime: "", languages: "<b>Languages:</b> ", certification: ""};
	
	part = 0;
	dataHolder: {movie: any, release_dates: any};

	constructor(private movieService: MovieService, private route: ActivatedRoute, public errorService: ErrorService) { 
		this.dataHolder = {movie: {}, release_dates: {}};

		errorService.message = "Failed to load movies";
	}

	ngOnInit() {
		this.routeSub = this.route.params.subscribe(params => {
			this.getDetails(params["id"]);
		})
	}

	ngOnDestroy() {
		this.routeSub.unsubscribe();
	}

	getDetails(id: number) {
		if (this.part == 0) {
			this.movieService.getMovieDetails(id, this.storeDetails.bind(this), this.errorCallback.bind(this));
		}
		else {
			this.movieService.getMovieReleaseDate(id, this.storeDetails.bind(this), this.errorCallback.bind(this));
		}
	}

	storeDetails(stringify: string) {
		const data = JSON.parse(stringify);

		if (this.part == 0) {
			this.dataHolder.movie = data;
		}
		else {
			this.dataHolder.release_dates = data;
		}

		this.part++;

		if (this.part == 2) {
			this.sendToDisplay("movie");
		}
		else {
			this.getDetails(data["id"]);
		}

		console.log(this.dataHolder);
	}

	errorCallback() {
		this.sendToDisplay("error");
	}

	sendToDisplay(command: string) {
	  	if (command == "movie") {
			this.details.poster = "https://image.tmdb.org/t/p/w500" + this.dataHolder.movie["poster_path"];
		  	this.details.title = this.dataHolder.movie["title"];
			this.details.description = this.dataHolder.movie["overview"];
			this.details.rating = "<span>" + this.dataHolder.movie["vote_average"].toFixed(1) + "</span> / 10";

			for (const genre of this.dataHolder.movie["genres"]) {
				this.details.genres = this.details.genres.concat(genre.name) + ", ";
			}

			this.details.genres = this.details.genres.substring(0, this.details.genres.length - 2);

			for (const date of this.dataHolder.release_dates["results"]) {
				if (date.iso_3166_1 != "GB") {
					continue;
				}

				let data = date.release_dates;

				this.details.release_date = "<b>Release Date:</b> " + data[0].release_date.split("T")[0];
				this.details.certification = "<b>Certification:</b> " + data[0].certification;
			}

			this.details.runtime = "<b>Length:</b> " + this.dataHolder.movie["runtime"] + " minutes";

			for (const languages of this.dataHolder.movie["spoken_languages"]) {
				this.details.languages = this.details.languages.concat(languages.english_name) + ", ";
			}

			this.details.languages = this.details.languages.substring(0, this.details.languages.length - 2);
			
			this.hide.movie = false;
	  	}
	  	else {
			this.hide.error = false;
	  	}

		this.loading = false;
  	}
}