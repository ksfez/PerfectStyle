import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { WorkerComponent } from './components/worker/worker.component';

@Component({
    selector: 'app-workersList',
    templateUrl: './workersList.component.html',
    styleUrls: ['./workersList.component.scss'], 
	providers: [WorkerComponent]
	
})
export class WorkersListComponent implements OnInit, OnDestroy {
	navigationSubscription;
	constructor(private router:Router, private workerComp:WorkerComponent) {
		console.log("entered in constructor WorkersListComponent");
	}
    ngOnInit() {}
	ngOnDestroy() {
  }
}
