import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';

@Component({
    selector: 'date-control',
    template: require('./date-control.component.html')
})
export class DateControlComponent implements OnChanges, OnInit {
    
    @Input() date: string;
    @Output() dateChange = new EventEmitter();
    
    day;
    month;
    year;
    hour;
    minute;
    
    constructor() {
        
    }
    
    ngOnInit() {
        
    }
    
    ngOnChanges(changes) {
      console.debug(changes);
      
      var date = new Date(this.date); 
      
      this.day = date.getDate();
      this.month = date.getMonth() + 1;
      this.year = date.getFullYear();
      this.hour = date.getHours();
      this.minute = date.getMinutes();
    }
    
    apply() {
        
        var date = new Date();
        date.setDate(this.day);
        date.setMonth(this.month - 1);
        date.setFullYear(this.year);
        date.setHours(this.hour);
        date.setMinutes(this.minute);
        date.setSeconds(0);
        date.setMilliseconds(0);
        
        this.dateChange.emit(date.toISOString());
    }
    
    
}