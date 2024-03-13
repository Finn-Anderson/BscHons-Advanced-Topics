import { Component, ComponentRef, HostListener, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { MovieComponent } from '../movie/movie.component';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorComponent } from '../../../error/components/error/error.component';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
 	 selector: 'app-search',
 	 standalone: true,
 	 imports: [CommonModule],
 	 templateUrl: './search.component.html',
 	 styleUrls: ['./search.component.css', '../globalmovie.component.css']
 })
export class SearchComponent {
	private routeSub!: Subscription;
	query = "";
	pageNum = 0;
	load = true;
	loading = false;

	@ViewChild("viewContainerRef", { read: ViewContainerRef }) vcr!: ViewContainerRef;
	ref!: ComponentRef<Component>
	
	constructor(private movieService: MovieService, private router: Router, private route: ActivatedRoute) {}

	ngOnInit() {
		this.routeSub = this.route.params.subscribe(params => {
			this.search(params["name"], this.pageNum);
		})
	}

	ngOnDestroy() {
		this.routeSub.unsubscribe();
	}

	search(name: string, page: number) {
		this.loading = true;
		this.query = name;
		this.movieService.searchForMovie(name, page + 1, this.displaySearch.bind(this), this.errorCallback.bind(this));
	}

	displaySearch(stringify: string) {
		const parse = JSON.parse(stringify);

		console.log(parse["results"]);

		for (const movie of parse["results"]) {
			this.addChildComponent(MovieComponent as Type<Component>, movie);
		}

		this.pageNum++;
	}

	errorCallback() {
		if (this.pageNum > 0) {
			this.load = false;
		}
		else {
			this.addChildComponent(ErrorComponent as Type<Component>);
		}
	}

	addChildComponent(component: Type<Component>, movie?: any) {
		this.ref = this.vcr.createComponent(component);

	  	if (this.ref.componentType == MovieComponent) {
		  	let instance = this.ref.instance as MovieComponent;

		  	instance.movieID = movie["id"];
		  	instance.poster = instance.url + movie["poster_path"];
			instance.name = movie["title"];
	  	}
	  	else {
		  	let instance = this.ref.instance as ErrorComponent;

		  	instance.errorMsg = "Failed to load movies";
		 	instance.marginTop = "0em";
	  	}
		this.loading = false;
  	}

	@HostListener("window:scroll", [])
	onScroll(): void {
		if ((window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 10) && this.load && !this.loading) {
			this.search(this.query, this.pageNum);
			console.log("gererg");
		}
	}
}