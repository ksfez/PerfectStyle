import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { TopComponent } from './components/top/top.component';

@Component({
    selector: 'app-topsList',
    templateUrl: './topsList.component.html',
    styleUrls: ['./topsList.component.scss'], 
	providers: [TopComponent]
	
})
export class TopsListComponent implements OnInit, OnDestroy {
	navigationSubscription;
	constructor(private router:Router, private topComp:TopComponent) {
		console.log("entered in constructor TopsListComponent");
	}
    ngOnInit() {}
	ngOnDestroy() {
  }
}
