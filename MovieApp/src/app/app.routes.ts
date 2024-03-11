import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { MovieComponent } from './movie/components/movie/movie.component';

export const routes: Routes = [
    {path: "home", component: MovieComponent},
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent}
];
