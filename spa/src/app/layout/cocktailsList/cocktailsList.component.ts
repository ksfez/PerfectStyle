import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { CocktailComponent } from './components/cocktail/cocktail.component';

@Component({
    selector: 'app-cocktailsList',
    templateUrl: './cocktailsList.component.html',
    styleUrls: ['./cocktailsList.component.scss'], 
	providers: [CocktailComponent]
	
})
export class CocktailsListComponent implements OnInit, OnDestroy {
	navigationSubscription;
	constructor(private router:Router, private cocktailComp:CocktailComponent) {
		console.log("entered in constructor CocktailsListComponent");
	}
    ngOnInit() {}
	ngOnDestroy() {
  }
}
