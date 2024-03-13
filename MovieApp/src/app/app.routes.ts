import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { MovieListComponent } from './movie/components/movielist/movielist.component';
import { AccountComponent } from './account/components/account.component';
import { AuthGuard } from './auth/services/auth-guard.service';
import { MovieDetailsComponent } from './movie/components/moviedetails/moviedetails.component';
import { SearchComponent } from './movie/components/search/search.component';
import { ErrorComponent } from './error/components/error/error.component';

export const routes: Routes = [
    {path: "", component: MovieListComponent},
    {path: "movie/:id", component: MovieDetailsComponent},
    {path: "search/:name", component: SearchComponent},
    {path: "login", canActivate: [AuthGuard], component: LoginComponent},
    {path: "register", canActivate: [AuthGuard], component: RegisterComponent},
    {path: "account", canActivate: [AuthGuard], component: AccountComponent},
    {path: "**", component: ErrorComponent}
];
