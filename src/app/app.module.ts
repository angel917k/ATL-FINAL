import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule} from '@angular/forms';

// import angular fire modules
import { environment } from './../environments/environment';
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

// import services
import { LoginService } from './services/login.service';
import { TipService } from './services/tip.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TipComponent } from './tip/tip.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { TipPageComponent } from './tip-page/tip-page.component';
import { SplashComponent } from './splash/splash.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { TutorialComponent } from './tutorial/tutorial.component';

const appRoutes: Routes = [
  {path: 'home', component: SplashComponent},
  {path: 'tip-page', component: TipPageComponent},
  {path: 'login-page', component: LoginPageComponent},
  {path: 'tutorial', component: TutorialComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},

];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TipComponent,
    NavComponent,
    FooterComponent,
    TipPageComponent,
    SplashComponent,
    LoginPageComponent,
    TutorialComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    LoginService,
    TipService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
