import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import {  AccessorieComponent } from './components/accessorie/accessorie.component';

@Component({
    selector: 'app- accessoriesList',
    templateUrl: './accessoriesList.component.html',
    styleUrls: ['./accessoriesList.component.scss'], 
	providers: [AccessorieComponent]
	
})
export class  AccessoriesListComponent implements OnInit, OnDestroy {
	navigationSubscription;
	constructor(private router:Router, private  accessorieComp: AccessorieComponent) {
		console.log("entered in constructor  AccessoriesListComponent");
	}
    ngOnInit() {}
	ngOnDestroy() {
  }
}
