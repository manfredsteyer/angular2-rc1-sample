import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide, enableProdMode} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {AppComponent} from './app.component';
import {FlugSuchenComponent} from './flug-suchen/flug-suchen.component';
//import {FlugSuchenImpComponent} from './flug-suchen-imp/flug-suchen.component';
import 'rxjs/add/operator/map';
import {FlugService} from './services/flug.service';
import {BASE_URL } from './app-tokens'
import { OrtPipe } from './pipes/ort.pipe';
import {PLATFORM_PIPES, PLATFORM_DIRECTIVES} from '@angular/core';
import { FlugCard } from './flug-card/flug-card.component';
import {ROUTER_PROVIDERS} from '@angular/router';
import { OAuthService } from 'angular2-oauth2/oauth-service';

// enableProdMode()

// Später in eigene Datei auslagern
var APP_PROVIDERS = [
  OAuthService,
  //FlugService,
  // provide(PLATFORM_PIPES, {useValue: OrtPipe, multi: true})
  // provide(PLATFORM_DIRECTIVES, {useValue: FlugCard, multi: true})
  provide(BASE_URL, {useValue: "http://www.angular.at/api"}),
];

var providers = [
  APP_PROVIDERS,
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS
];

bootstrap(AppComponent, providers);

