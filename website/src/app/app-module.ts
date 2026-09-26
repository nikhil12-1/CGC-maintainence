import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './user/home/home';
import { Header } from './user/header/header';
import { Footer } from './user/footer/footer';
import { Submit } from './user/submit/submit';
import { Track } from './user/track/track';
import { Mycmp } from './user/mycmp/mycmp';
import { Login } from './user/login/login';
import { Register } from './user/register/register';
import { Profile } from './user/profile/profile';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
@NgModule({
  declarations: [App, Home, Header, Footer, Submit, Track, Mycmp, Login, Register, Profile],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [provideBrowserGlobalErrorListeners(), { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [App],
})
export class AppModule {}
