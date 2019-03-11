import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { WorkerService } from '../../../../services/worker.service';
import { ItemService } from '../../../../services/item.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import Worker from '../../../../models/worker';
import Item from '../../../../models/item';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WorkerComponent implements OnInit {
  workers: Worker[] = [];
  modalReference: any;
  closeResult: string;
  message = '';
  worker = { id:'', name:'', color:'', price:'', img:''};
  //item = { id:"", name:"", color:"", price:"", img:"", userId:""};
  item:Item =new Item();
  role='';
    
  constructor(public router: Router, private workerService: WorkerService ,private itemService: ItemService , private modalService: NgbModal) { }
  
  open(content) {
		this.modalReference = this.modalService.open(content);
		this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
	openDelete(content,worker) {
		this.modalReference = this.modalService.open(content);
		this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
		this.worker=worker;
		
    }
  private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }
	
   getJwtToken(){
	//console.log("entered in getJwtToken")
	let jwt=localStorage.getItem('jwtToken');
	if(jwt !=null){
		let jwtData = jwt.split('.')[1]
		let decodedJwtJsonData = window.atob(jwtData);
		let decodedJwtData = JSON.parse(decodedJwtJsonData);
		this.role = decodedJwtData.role;
		if(this.role=="Admin")
			return 1;
	}
    return 0;
}
     getConnected(){
	//console.log("entered in getJwtToken")
	let jwt=localStorage.getItem('jwtToken');
	if(jwt !=null){
		let jwtData = jwt.split('.')[1]
		let decodedJwtJsonData = window.atob(jwtData);
		let decodedJwtData = JSON.parse(decodedJwtJsonData);
		this.role = decodedJwtData.role;
		return 1;
	}
    return 0;
}
  ngOnInit() {
	
    this.workerService.getWorkers()
      .subscribe(res => {
        this.workers = res;
        console.log(res);
      });
	  
	if(this.getJwtToken()==1)
	{
		document.getElementById('AddWorker').style.visibility='visible';
	}
  }
  
  fetchData() {
	  
	console.log("entered in fetchData");
    this.workerService.getWorkers()
      .subscribe(res => {
        this.workers = res;
      });
	  this.router.navigate(['workersList']);
  }

  saveWorker() {
	let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
	
		this.workerService.postWorker(this.worker, httpOptions).subscribe(resp => {
		this.modalReference.close();
		this.message = '';
		this.worker = { id:'', name:'', color:'', price:'', img:''};
		this.fetchData();
		
	  }, err => {
      this.message = "Workers already exist";
	  });
  }

  deleteWorker(id: string) {
	let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
	this.workerService.deleteWorker(id, httpOptions)
		.subscribe(res => {
			this.modalReference.close();
			this.worker = { id:'', name:'', color:'', price:'', img:''};
		});
	this.fetchData();
	  
  }
  
  
  addWorkerToWhishlist(worker: Worker) {
	let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
	console.log("enter in addWorkerToWhishlist");
	let jwt=localStorage.getItem('jwtToken');
	if(jwt !=null){
		let jwtData = jwt.split('.')[1]
		let decodedJwtJsonData = window.atob(jwtData);
		let decodedJwtData = JSON.parse(decodedJwtJsonData);
		console.log(decodedJwtData.name);
		console.log(decodedJwtData._id);
		this.item.userId= decodedJwtData._id;
		this.item.name=worker.name;
		this.item.id=worker.id ;
		this.item.color=worker.color ;
		this.item.price=worker.price;
		this.item.img=worker.img ;
		console.log(this.item);
		this.itemService.postItem(this.item, httpOptions)
			.subscribe(res => {
				console.log("saved item");
			});
		this.fetchData();
		this.router.navigate(['myWhishlist']);
	}
	else
		console.log( "cannot add to bag");
	  
  }


  editWorker(worker: Worker) {
  }
}
