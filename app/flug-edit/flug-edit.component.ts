import { Component } from '@angular/core';
import { OnActivate, RouteSegment, Router, CanDeactivate} from '@angular/router';
import { OAuthService } from 'angular2-oauth2/oauth-service';


@Component({
    template: `
        <h1>{{info}}</h1>
        
        <div *ngIf="exitWarning.show" class="alert alert-warning">
            <div>
                Daten wurden doch nicht gespeichert! Doch Maske verlassen?
            </div>
            <div>
                <a href="javascript:void(0)" (click)="decideForExit(true)" class="btn btn-danger">Ja</a>
                <a href="javascript:void(0)" (click)="decideForExit(false)" class="btn btn-default">Nein</a>
            </div>
        </div>

        
        <div>Hier könnte der Flug # {{id}} stehen!</div>
    `
})
export class FlugEditComponent implements OnActivate, CanDeactivate {
    
    public info = "FlugEdit!";
    public id: string;
    
    constructor(private router: Router, private oauthService: OAuthService) {
        
    }
    
    public exitWarning = {
        show: false,
        resolve: null
    }
    
    decideForExit(d: boolean) {
        this.exitWarning.show = false;
        this.exitWarning.resolve(d);
    }
    
    routerCanDeactivate() {
        this.exitWarning.show = true;
        
        return new Promise((resolve) => {
            this.exitWarning.resolve = resolve;
        })
    }
    
    routerOnActivate(curr: RouteSegment): void {
        this.id = curr.getParam('id');
        
        var hasAccessToken = this.oauthService.hasValidAccessToken();
        var hasIdToken = this.oauthService.hasValidIdToken();
        
        this.router.navigateByUrl("/");
  
    }
}