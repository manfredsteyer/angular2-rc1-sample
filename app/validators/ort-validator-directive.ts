import { Directive, provide, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/common';
import { OrtValidator} from './ort-validator';

@Directive({
    selector: 'input[ort]', // --> <input ort ...>
    providers: [provide(NG_VALIDATORS, {useExisting: OrtValidatorDirective, multi: true })]
})
export class OrtValidatorDirective implements Validator {
    
    validator: (c: AbstractControl) => any;
    
    constructor(@Attribute('ort') ort: string) {
        var orte = ort.split(',');
        this.validator = OrtValidator.validateWithParams(orte);
    }
    
    validate(c: AbstractControl): any {
        //return OrtValidator.validate(c);
        return this.validator(c);
    }
    
}