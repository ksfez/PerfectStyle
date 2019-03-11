import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { ShoeComponent } from './components/shoe/shoe.component';

@Component({
    selector: 'app-shoesList',
    templateUrl: './shoesList.component.html',
    styleUrls: ['./shoesList.component.scss'], 
	providers: [ShoeComponent]
	
})
export class ShoesListComponent implements OnInit, OnDestroy {
	navigationSubscription;
	constructor(private router:Router, private shoeComp:ShoeComponent) {
		console.log("entered in constructor ShoesListComponent");
	}
    ngOnInit() {}
	ngOnDestroy() {
  }
}
