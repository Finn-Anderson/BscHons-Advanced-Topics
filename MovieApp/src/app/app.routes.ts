import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { MovieComponent } from './movie/components/movie/movie.component';
import { AccountComponent } from './account/components/account.component';
import { AuthGuard } from './auth/services/auth-guard.service';

export const routes: Routes = [
    {path: "", component: MovieComponent},
    {path: "login", canActivate: [AuthGuard], component: LoginComponent},
    {path: "register", canActivate: [AuthGuard], component: RegisterComponent},
    {path: "account", canActivate: [AuthGuard], component: AccountComponent}
];
