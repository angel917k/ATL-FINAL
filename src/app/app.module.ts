import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// import angular fire modules
import { environment } from './../environments/environment';
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

// import services
import { LoginService } from './services/login.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TipComponent } from './tip/tip.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { TipPageComponent } from './tip-page/tip-page.component';
import { SplashComponent } from './splash/splash.component';
import { LoginPageComponent } from './login-page/login-page.component';
const appRoutes: Routes = [
  {path: 'home', component: SplashComponent},
  {path: 'tip-page', component: TipPageComponent},
  {path: 'login-page', component: LoginPageComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    TipComponent,
    NavComponent,
    FooterComponent,
    TipPageComponent,
    SplashComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
