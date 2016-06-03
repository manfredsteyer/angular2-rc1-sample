import {Component} from '@angular/core'
import {ROUTER_DIRECTIVES, Routes} from '@angular/router'
import { FlugSuchenComponent} from '../flug-suchen/flug-suchen.component';
import { FlugEditComponent} from '../flug-edit/flug-edit.component';
import { FlugSuchenImpComponent} from '../flug-suchen-imp/flug-suchen.component';
import { PassagierListComponent} from '../passagier-list/passagier-list.component';
import { FlugService} from '../services/flug.service';

@Component({
    template: require('./flug-buchen.component.html'),
    directives: [ROUTER_DIRECTIVES],
    providers: [FlugService]
})
@Routes([
    { path: '/flug-suchen', component: FlugSuchenComponent},
    { path: '/flug-suchen-imp', component: FlugSuchenImpComponent},
    { path: '/passagier-list', component: PassagierListComponent},
    { path: '/flug-edit/:id', component: FlugEditComponent}
])
export class FlugBuchenComponent {
}