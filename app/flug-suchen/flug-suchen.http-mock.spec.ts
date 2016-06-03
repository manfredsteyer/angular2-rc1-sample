import { it, inject, injectAsync, beforeEachProviders } from '@angular/core/testing';

import {ROUTER_PROVIDERS} from '@angular/router';
import {provide} from '@angular/core';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import {FlugSuchenComponent} from './flug-suchen.component';
import {FlugService} from './../services/flug.service';
import {BaseRequestOptions, Http, Response, ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {Observable} from 'rxjs/Observable';
import {Flug} from '../entities/flug';

// HTTP_PROVIDERS
var HTTP_MOCK_PROVIDERS = [
    OAuthService,
    BaseRequestOptions,
    MockBackend,
    provide(Http, { useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
    }, deps: [MockBackend, BaseRequestOptions]})  
];

describe('FlugSuchen with Mock', () => {
 
    beforeEachProviders(() => [ 
        FlugSuchenComponent,
        FlugService, 
        provide("BASE_URL", {useValue: 'http://www.angular.at/api'}),
        HTTP_MOCK_PROVIDERS
    ]);
    
    it('should load flights', inject([FlugSuchenComponent, MockBackend], (flugSuchen: FlugSuchenComponent, backend: MockBackend) => {

        // Arrange
        var connection;
        backend.connections.subscribe((c: MockConnection) => { 

            console.debug('Mocking response for ' + c.request.url);

            if (c.request.url == "http://www.angular.at/api/flug?abflugort=Graz&zielort=Hamburg") {

                c.mockRespond(
                    new Response(
                        new ResponseOptions(
                            { body: '[{"id": 1, "abflugort": "Graz", "zielort": "Hamburg", "datum": "2017-01-01"}]' })));

            }
        });
        
        flugSuchen.von = "Graz";
        flugSuchen.nach = "Hamburg";

        // Act
        return flugSuchen.search().then((fluege: Flug[]) => {
                expect(fluege.length).toEqual(1);
                expect(fluege[0].id).toEqual(1);
                expect(fluege[0].abflugort).toEqual('Graz');
        })
            
    }));
    
});