import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { CasualComponent } from './components/casual/casual.component';

@Component({
    selector: 'app-casualsList',
    templateUrl: './casualsList.component.html',
    styleUrls: ['./casualsList.component.scss'], 
	providers: [CasualComponent]
	
})
export class CasualsListComponent implements OnInit, OnDestroy {
	navigationSubscription;
	constructor(private router:Router, private casualComp:CasualComponent) {
		console.log("entered in constructor CasualsListComponent");
	}
    ngOnInit() {}
	ngOnDestroy() {
  }
}
