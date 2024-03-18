import { Component, ViewEncapsulation } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription} from 'rxjs';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../../error/components/error/error.component';
import { ErrorService } from '../../../error/services/error.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SubscriptionsService } from '../../../account/services/subscriptions.service';

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
	hide = {error: true, movie: true, subError: true, subscriptions: true};
	details = {poster: "", title: "", description: "", rating: "", genres: "<b>Genres:</b> ", release_date: "", runtime: "", languages: "<b>Languages:</b> ", certification: ""};
	subscriptions = {netflix: "Unavailable", sky: "Unavailable", now: "Unavailable", amazon: "Unavailable", disney: "Unavailable"};
	
	part = 0;
	dataHolder: {movie: any, release_dates: any, providers: any};

	constructor(private movieService: MovieService, private route: ActivatedRoute, public errorService: ErrorService, private auth: AngularFireAuth, private subscriptionsService: SubscriptionsService) { 
		this.dataHolder = {movie: {}, release_dates: {}, providers: {}};

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
		else if (this.part == 1) {
			this.movieService.getMovieReleaseDate(id, this.storeDetails.bind(this), this.errorCallback.bind(this));
		}
		else {
			this.movieService.getMovieStreamingProviders(id, this.storeDetails.bind(this), this.errorCallback.bind(this));
		}
	}

	storeDetails(stringify: string) {
		const data = JSON.parse(stringify);

		if (this.part == 0) {
			this.dataHolder.movie = data;
		}
		else if (this.part == 1) {
			this.dataHolder.release_dates = data;
		}
		else {
			this.dataHolder.providers = data;
		}

		this.part++;

		if (this.part == 3) {
			this.sendToDisplay("movie");
		}
		else {
			this.getDetails(data["id"]);
		}
	}

	errorCallback() {
		this.sendToDisplay("error");
	}

	setSubscriptions(stringify: string) {
		var parse = JSON.parse(stringify);

		if (!this.dataHolder.providers.results["GB"]) {
			this.hide.subscriptions = false;
			
			return;
		}

		let options = [this.dataHolder.providers.results["GB"].flatrate, this.dataHolder.providers.results["GB"].buy];

		for (const option of options) {
			if (option == undefined)
				continue;

			for (const provider of option) {
				let value = "Unsubscribed"

				if (provider.provider_name.includes("Netflix")) {
					if (parse != null && parse["netflix"]) {
						value = "Subscribed";
					}

					this.subscriptions.netflix = value;
				}
				else if (provider.provider_name.includes("Sky")) {
					if (parse != null && parse["sky"]) {
						value = "Subscribed";
					}

					this.subscriptions.sky = value;
				}
				else if (provider.provider_name.includes("Now")) {
					if (parse != null && parse["now"]) {
						value = "Subscribed";
					}

					this.subscriptions.now = value;
				}
				else if (provider.provider_name.includes("Amazon")) {
					if (parse != null && parse["amazon"]) {
						value = "Subscribed";
					}

					this.subscriptions.amazon = value;
				}
				else if (provider.provider_name.includes("Disney")) {
					if (parse != null && parse["disney"]) {
						value = "Subscribed";
					}

					this.subscriptions.disney = value;
				}
			}
		}

		this.hide.subscriptions = false;
	}

	subErrorCallback() {
		this.hide.subError = false;
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

			this.auth.authState.subscribe(user => {
				if (user) {
					user?.getIdToken(false).then(token => {
						this.subscriptionsService.getSubscriptions(user.uid, token, this.setSubscriptions.bind(this), this.subErrorCallback.bind(this));
					})
				}
			});
			
			this.hide.movie = false;
	  	}
	  	else {
			this.hide.error = false;
	  	}

		this.loading = false;
  	}
}