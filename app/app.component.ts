import { Component } from '@angular/core'
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';    
import { HomeComponent } from './home/home.component';    
import { FlugBuchenComponent } from './flug-buchen/flug-buchen.component';
import { OAuthService } from 'angular2-oauth2/oauth-service';

@Component({
    selector: 'flug-app', 
    template: require("./app.component.html"),
    directives: [ROUTER_DIRECTIVES]
})
@Routes([
    { path: '/', component: HomeComponent},
    { path: '/flug-buchen', component: FlugBuchenComponent}
])
export class AppComponent {
    
    constructor(private oauthService: OAuthService) {
        
        this.oauthService.loginUrl = "https://localhost:44301/identity/connect/authorize"; //Id-Provider?
        this.oauthService.redirectUri = window.location.origin + "/index.html";
        this.oauthService.clientId = "spa-demo";
        this.oauthService.scope = "openid profile email voucher";
        this.oauthService.issuer = "https://localhost:44301/identity";
        this.oauthService.oidc = true;  
        
        this.oauthService.tryLogin({}); // Parst Token aus der Url
              
    }
}