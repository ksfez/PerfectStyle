import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { SaleComponent } from './components/sale/sale.component';

@Component({
    selector: 'app-salesList',
    templateUrl: './salesList.component.html',
    styleUrls: ['./salesList.component.scss'], 
	providers: [SaleComponent]
	
})
export class SalesListComponent implements OnInit, OnDestroy {
	navigationSubscription;
	constructor(private router:Router, private saleComp:SaleComponent) {
		console.log("entered in constructor SalesListComponent");
	}
    ngOnInit() {}
	ngOnDestroy() {
  }
}
