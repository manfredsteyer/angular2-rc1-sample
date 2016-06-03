import { Component } from '@angular/core';
import { OAuthService } from 'angular2-oauth2/oauth-service';

@Component({
    template: `
        <h1>{{info}}</h1>
        <h2 *ngIf="userName">Hello {{userName}}</h2>
        
        <button (click)="login()">Login</button>
        <button (click)="logoff()">Logout</button>
        
        
    `
})
export class HomeComponent {
    
    public info = "Willkommen!";
    
    constructor(private authService: OAuthService) {
        
    }
    
    get userName() {
        var claims = this.authService.getIdentityClaims();
        if (!claims) return "";
        
        console.debug(claims);
        return claims.given_name;
    }
    
    login() {
        this.authService.initImplicitFlow();
    }
    
    logoff() {
        this.authService.logOut();  
    }
    
}