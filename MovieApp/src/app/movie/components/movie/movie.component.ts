import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  	selector: 'app-movie',
  	standalone: true,
  	imports: [RouterModule],
  	templateUrl: './movie.component.html',
  	styleUrl: './movie.component.css'
})
export class MovieComponent {
	movieID!: number;

	url = "https://image.tmdb.org/t/p/w500";
	poster!: string;
}
