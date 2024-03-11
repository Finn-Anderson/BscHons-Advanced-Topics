import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavInputsComponent } from './navinputs/navinputs.component';
import { RegisterComponent } from './auth/components/register/register.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		RouterModule, 
		NavInputsComponent,
		RegisterComponent
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent {
	title = 'MovieApp';
}