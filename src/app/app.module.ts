import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


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
  {path: 'home', component: HomeComponent},
  {path: 'tip-page', component: TipPageComponent},
  {path: 'login-page', component: LoginPageComponent},
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
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


export class AppRoutingModule {

}

export const RoutingComponents = [ HomeComponent, TipPageComponent ];
