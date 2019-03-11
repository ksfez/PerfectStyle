import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { CasualService } from '../../../../services/casual.service';
import { ItemService } from '../../../../services/item.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import Casual from '../../../../models/casual';
import Item from '../../../../models/item';

@Component({
  selector: 'app-casual',
  templateUrl: './casual.component.html',
  styleUrls: ['./casual.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CasualComponent implements OnInit {
  casuals: Casual[] = [];
  modalReference: any;
  closeResult: string;
  message = '';
  casual = { id:'', name:'', color:'', price:'', img:''};
  //item = { id:"", name:"", color:"", price:"", img:"", userId:""};
  item:Item =new Item();
  role='';
    
  constructor(public router: Router, private casualService: CasualService ,private itemService: ItemService , private modalService: NgbModal) { }
  
  open(content) {
		this.modalReference = this.modalService.open(content);
		this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
	
	openDelete(content,casual) {
		this.modalReference = this.modalService.open(content);
		this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
		this.casual=casual;
		
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
	
    this.casualService.getCasuals()
      .subscribe(res => {
        this.casuals = res;
        console.log(res);
      });
	  
	if(this.getJwtToken()==1)
	{
		document.getElementById('AddCasual').style.visibility='visible';
	}
  }
  
  fetchData() {
	  
	console.log("entered in fetchData");
    this.casualService.getCasuals()
      .subscribe(res => {
        this.casuals = res;
      });
	  this.router.navigate(['casualsList']);
  }

  saveCasual() {
	let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
	
		this.casualService.postCasual(this.casual, httpOptions).subscribe(resp => {
		this.modalReference.close();
		this.message = '';
		this.casual = { id:'', name:'', color:'', price:'', img:''};
		this.fetchData();
		
	  }, err => {
      this.message = "Casuals already exist";
	  });
  }

  deleteCasual(id: string) {
	let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
	this.casualService.deleteCasual(id, httpOptions)
		.subscribe(res => {
			this.modalReference.close();
			this.casual = { id:'', name:'', color:'', price:'', img:''};
		});
	this.fetchData();
	  
  }
  
  
  addCasualToWhishlist(casual: Casual) {
	let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
	console.log("enter in addCasualToWhishlist");
	let jwt=localStorage.getItem('jwtToken');
	if(jwt !=null){
		let jwtData = jwt.split('.')[1]
		let decodedJwtJsonData = window.atob(jwtData);
		let decodedJwtData = JSON.parse(decodedJwtJsonData);
		console.log(decodedJwtData.name);
		console.log(decodedJwtData._id);
		this.item.userId= decodedJwtData._id;
		this.item.name=casual.name;
		this.item.id=casual.id ;
		this.item.color=casual.color ;
		this.item.price=casual.price;
		this.item.img=casual.img ;
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


  editCasual(casual: Casual) {
  }
}
