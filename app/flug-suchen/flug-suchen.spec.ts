import { it, inject, injectAsync, beforeEachProviders } from '@angular/core/testing';

import {ROUTER_PROVIDERS} from '@angular/router';
import {provide} from '@angular/core';
import {FlugSuchenComponent} from './flug-suchen.component';
import {FlugService} from './../services/flug.service';
import {BaseRequestOptions, Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {Observable} from 'rxjs';
import {Flug} from '../entities/flug';
import { OAuthService } from 'angular2-oauth2/oauth-service';

class FlugServiceMock {
    findById(id) { return null; }
    find(von, nach) {
        var result = [{ id: 1, abflugort: 'Graz', zielort: 'Hamburg', datum: '2017-01-01' }];
        //return Observable.from([result]);
        return Promise.resolve(result);
    }
    save(flug) { return null; }
}

describe('FlugSuchen', () => {
 
    beforeEachProviders(() => [ 
        OAuthService,
        FlugSuchenComponent,
        provide(FlugService, { useClass: FlugServiceMock }),
    ]);
    
    it('should have no selected flight initially', inject([FlugSuchenComponent], (flugSuchen: FlugSuchenComponent) => {
        expect(flugSuchen.selectedFlug).toBeUndefined();
    }));
    
    it('should load flights', inject([FlugSuchenComponent], (flugSuchen: FlugSuchenComponent) => {

        flugSuchen.von = "Graz";
        flugSuchen.nach = "Hamburg";

        return flugSuchen.search().then((fluege: Flug[]) => {
            expect(fluege.length).toEqual(1);                
        });

    }));
    
});