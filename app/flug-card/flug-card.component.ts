import { Flug } from '../entities/flug';
import { EventEmitter, Input, Output, Component } from '@angular/core';


@Component({
    selector: 'flug-card',
    template: require('./flug-card.component.html')
})
export class FlugCard {
    
    @Input('item') flug: Flug;
    @Input() selectedItem: Flug;
    @Output() selectedItemChange = new EventEmitter();
    
    select() {
        this.selectedItemChange.emit(/*$event=*/this.flug);
    }
    
}