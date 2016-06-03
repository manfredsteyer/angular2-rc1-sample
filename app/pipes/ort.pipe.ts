import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ort',
    pure: true
})
export class OrtPipe implements PipeTransform {
    
    transform(value: any, ...args: any[]): any {
        
        var fmt = args.length > 0 ? args[0] : 'short';
        var short;
        var long;
        
        switch(value) {
            case "Graz":
                short = "GRZ";
                long = "Flughafen Graz Thalerhof";
            break;
            case "Hamburg":
                short = "HAM";
                long = "Hamburg Airport Helmut Schmidt";
            break;
            default:
                short = long = "ROM";
        }
        
        if (fmt == 'short') return short;
        return long;
        
    }
    
}