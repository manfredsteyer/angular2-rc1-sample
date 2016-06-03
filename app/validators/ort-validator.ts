import { AbstractControl} from '@angular/common';

export class OrtValidator {


    static validateWithParams(orte: string[]) {
        return function(ctrl: AbstractControl): any {
            
            if (orte.indexOf(ctrl.value) > -1) {
                return {};
            }
            
            return { 
                ort: true   // .hasError('ort')
            }

        }
    }
    
    static validate(ctrl: AbstractControl): any {
        
        if (ctrl.value == 'Graz'
            || ctrl.value == 'Wien'
            || ctrl.value == 'Hamburg'
            || ctrl.value == 'Mallorca'
            || ctrl.value == 'Zürich') {
        
            return { };        
        }
        
        return { 
            ort: true   // .hasError('ort')
        }
        
    }
    
    
}