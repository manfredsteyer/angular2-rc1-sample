import { Http, URLSearchParams, Headers } from '@angular/http'
import { Flug } from '../entities/flug';
import { Component} from '@angular/core';
import { FlugService} from '../services/flug.service';
import { OrtPipe } from '../pipes/ort.pipe';
import { FlugCard} from '../flug-card/flug-card.component';
import { DateControlComponent} from '../date-control/date-control.component';
import { ControlGroup, FormBuilder, Validators } from '@angular/common';
import { OrtValidator} from '../validators/ort-validator';
import { OrtAsyncValidator} from '../validators/ort-async-validator';

const APP_DIRECTIVES = [
    DateControlComponent,
    FlugCard  
];

@Component({
    selector: 'flug-suchen', // <flug-suchen></flug-suchen> 
    template: require('./flug-suchen.component.html'),
    pipes: [OrtPipe],
    directives: [APP_DIRECTIVES],
    styles: [require("./flug-suchen.component.css")]
})
export class FlugSuchenImpComponent {
    
    
    public selectedFlug: Flug;
    
    public get fluege() {
        return this.flugService.fluege;
    }
    
    public filter: ControlGroup;
    
    public formMetaData = [
      { fieldName: 'von', label: 'Von' },
      { fieldName: 'nach', label: 'Nach' }
    ];
    
    constructor(
        private flugService: FlugService,
        private fb: FormBuilder) {
            
            
            this.filter = fb.group({
               von: [
                        'Graz',
                        Validators.compose([
                            Validators.required, // ctrl --> { required: true }
                            Validators.minLength(3),
                            Validators.maxLength(50),
                            OrtValidator.validateWithParams(['Graz', 'Wien', 'Hamburg']),
                            Validators.pattern("[a-zA-Z0-9]+")
                        ]),
                        Validators.composeAsync([
                            OrtAsyncValidator.validateAsync
                        ])
                    ],
               nach: ['Hamburg'] 
            });
            
            this.filter.validator = (ctrlGroup:  ControlGroup) => {
                
                var von = ctrlGroup.find('von');
                var nach = ctrlGroup.find('nach');
                
                if (von.value == nach.value) {
                    return { route: true };
                }
                
                return { };
            }
            // this.filter.asyncValidator
            
            // this.filter.controls['von'].value;
            // this.filter.controls['von'].hasError('required')
    }
    
    
    
    search() {
        
        return new Promise((resolve, reject) => {
            
            var value = this.filter.value;
            
            this
                .flugService
                .find(value.von, value.nach);
                
        });        
    }
    
    select(flug: Flug): void {
        this.selectedFlug = flug;
    }
    
}