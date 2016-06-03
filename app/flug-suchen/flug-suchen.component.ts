import { Http, URLSearchParams, Headers } from '@angular/http'
import { Flug } from '../entities/flug';
import { Component} from '@angular/core';
import { FlugService} from '../services/flug.service';
import { OrtPipe } from '../pipes/ort.pipe';
import { FlugCard} from '../flug-card/flug-card.component';
import { DateControlComponent} from '../date-control/date-control.component';
import { OrtValidatorDirective } from '../validators/ort-validator-directive';
import { ROUTER_DIRECTIVES } from '@angular/router';


const APP_DIRECTIVES = [
    DateControlComponent,
    FlugCard,
    OrtValidatorDirective  
];

@Component({
    selector: 'flug-suchen', // <flug-suchen></flug-suchen> 
    template: require('./flug-suchen.component.html'),
    //providers: [FlugService],
    pipes: [OrtPipe],
    directives: [APP_DIRECTIVES, ROUTER_DIRECTIVES],
    styles: [require("./flug-suchen.component.css")]
})
export class FlugSuchenComponent {
    
    public von: string = "Graz";
    public nach: string = "Hamburg";
    public selectedFlug: Flug;
    
    public datum: string = (new Date()).toISOString();
 
    constructor(
        private flugService: FlugService) {
    }
    
    // {{ fleuge }}
    // x.fluege
    public get fluege() {
        return this.flugService.fluege;
    }
    
    search() {

        return this
            .flugService
            .find(this.von, this.nach);
    }
    
    select(flug: Flug): void {
        this.selectedFlug = flug;
    }
    
}