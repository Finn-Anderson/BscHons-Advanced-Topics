import { Component, ComponentRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { MovieComponent } from '../movie/movie.component';

@Component({
  	selector: 'app-movielist',
  	standalone: true,
  	imports: [],
  	templateUrl: './movielist.component.html',
  	styleUrl: './movielist.component.css',
	encapsulation: ViewEncapsulation.None
})
export class MovieListComponent {
	@ViewChild("viewContainerRefTrending", { read: ViewContainerRef }) vcrt!: ViewContainerRef;
	@ViewChild("viewContainerRefUpcoming", { read: ViewContainerRef }) vcru!: ViewContainerRef;
	ref!: ComponentRef<MovieComponent>
	
	constructor(private movieService: MovieService) {
		movieService.getTrendingMovies(this.displayTrendingMovies.bind(this));
		movieService.getUpcomingMovies(this.displayUpcomingMovies.bind(this));
	}

	private displayMovies(stringify: string, vcr: ViewContainerRef) {
		const parse = JSON.parse(stringify);

		console.log(parse["results"]);

		for (const movie of parse["results"]) {
			this.addChildComponent(vcr, movie["id"], movie["poster_path"]);
		}
	}

	displayTrendingMovies(stringify: string) {
		this.displayMovies(stringify, this.vcrt);
	}

	displayUpcomingMovies(stringify: string) {
		this.displayMovies(stringify, this.vcru);
	}

	addChildComponent(vcr: ViewContainerRef, id: number, path: string) {
  		this.ref = vcr.createComponent(MovieComponent);
		this.ref.instance.movieID = id;
		this.ref.instance.poster = this.ref.instance.url + path;
	}
}
