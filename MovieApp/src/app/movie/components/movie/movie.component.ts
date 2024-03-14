import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  	selector: 'app-movie',
  	standalone: true,
  	imports: [RouterModule],
  	templateUrl: './movie.component.html',
  	styleUrls: ['./movie.component.css', '../globalmovie.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class MovieComponent {
	movieID!: number;

	url = "https://image.tmdb.org/t/p/w500";
	poster!: string;

	name!: string;
}
