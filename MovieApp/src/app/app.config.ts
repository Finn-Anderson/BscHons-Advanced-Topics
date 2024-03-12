import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { AngularFireModule } from '@angular/fire/compat';

import { routes } from './app.routes';
import { firebaseConfig } from './auth/models/firebase.model';

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), importProvidersFrom(AngularFireModule.initializeApp(firebaseConfig))]
};
