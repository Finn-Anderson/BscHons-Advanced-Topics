import { Component, OnInit } from "@angular/core";
import { RouterModule } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-navinputs",
    standalone: true,
    imports: [
        RouterModule,
        CommonModule
    ],
    templateUrl: "./navinputs.component.html",
    styleUrls: ["./navinputs.component.css"]
})
export class NavInputsComponent implements OnInit {
    
    constructor(private auth: AngularFireAuth) { }

    authenticated = false;
    authSubscription = new Subscription;

    ngOnInit(): void {
        this.authSubscription = this.auth.authState.subscribe(user => {
            this.authenticated = user ? true : false;
        })
    }

    ngOnDestroy(): void {
        this.authSubscription.unsubscribe();
    }
}