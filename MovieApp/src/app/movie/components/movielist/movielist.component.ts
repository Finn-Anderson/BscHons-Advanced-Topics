import { Component, ComponentRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { MovieComponent } from '../movie/movie.component';
import { ErrorComponent } from '../../../error/components/error/error.component';
import { CommonModule } from '@angular/common';

@Component({
  	selector: 'app-movielist',
  	standalone: true,
  	imports: [CommonModule],
  	templateUrl: './movielist.component.html',
  	styleUrls: ['./movielist.component.css', '../globalmovie.component.css']
})
export class MovieListComponent {
	loading;

	@ViewChild("viewContainerRefTrending", { read: ViewContainerRef }) vcrt!: ViewContainerRef;
	@ViewChild("viewContainerRefUpcoming", { read: ViewContainerRef }) vcru!: ViewContainerRef;
	ref!: ComponentRef<Component>
	
	constructor(private movieService: MovieService) {
		this.loading = {trending: true, upcoming: true};

		movieService.getTrendingMovies(this.displayTrendingMovies.bind(this), this.displayError.bind(this));
		movieService.getUpcomingMovies(this.displayUpcomingMovies.bind(this), this.displayError.bind(this));
	}

	private displayMovies(stringify: string, vcr: ViewContainerRef) {
		const parse = JSON.parse(stringify);

		for (const movie of parse["results"]) {
			this.addChildComponent(MovieComponent as Type<Component>, vcr, movie);
		}
	}

	displayTrendingMovies(stringify: string) {
		this.displayMovies(stringify, this.vcrt);

		this.loading.trending = false;
	}

	displayUpcomingMovies(stringify: string) {
		this.displayMovies(stringify, this.vcru);

		this.loading.upcoming = false;
	}

	displayError(page: string) {
		let vcr;

		if (page == "upcoming") {
			vcr = this.vcru;
			this.loading.upcoming = false;
		}
		else {
			vcr = this.vcrt;
			this.loading.trending = false;
		}

		this.addChildComponent(ErrorComponent as Type<Component>, vcr);
	}

	addChildComponent(component: Type<Component>, vcr: ViewContainerRef, movie?: any) {
  		this.ref = vcr.createComponent(component);

		if (this.ref.componentType == MovieComponent) {
			let instance = this.ref.instance as MovieComponent;

			instance.movieID = movie["id"];
		  	instance.poster = instance.url + movie["poster_path"];
			instance.name = movie["title"];
		}
		else {
			let instance = this.ref.instance as ErrorComponent;

			instance.errorService.message = "Failed to load movies";
			instance.marginTop = "0em";
		}
	}
}
