import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { TopService } from '../../../../services/top.service';
import { ItemService } from '../../../../services/item.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import Top from '../../../../models/top';
import Item from '../../../../models/item';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TopComponent implements OnInit {
  tops: Top[] = [];
  modalReference: any;
  closeResult: string;
  message = '';
  top = { id:'', name:'', color:'', price:'', img:''};
  //item = { id:"", name:"", color:"", price:"", img:"", userId:""};
  item:Item =new Item();
  role='';
    
  constructor(public router: Router, private topService: TopService ,private itemService: ItemService , private modalService: NgbModal) { }
  
  open(content) {
		this.modalReference = this.modalService.open(content);
		this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
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
	
	
	openDelete(content,top) {
		this.modalReference = this.modalService.open(content);
		this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
		this.top=top;
		
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
	
    this.topService.getTops()
      .subscribe(res => {
        this.tops = res;
        console.log(res);
      });
	  
	if(this.getJwtToken()==1)
	{
		document.getElementById('AddTop').style.visibility='visible';
	}
  }
  
  fetchData() {
	  
	console.log("entered in fetchData");
    this.topService.getTops()
      .subscribe(res => {
        this.tops = res;
      });
	  this.router.navigate(['topsList']);
  }

  saveTop() {
	let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
	
		this.topService.postTop(this.top, httpOptions).subscribe(resp => {
		this.modalReference.close();
		this.message = '';
		this.top = { id:'', name:'', color:'', price:'', img:''};
		this.fetchData();
		
	  }, err => {
      this.message = "Tops already exist";
	  });
  }

  deleteTop(id: string) {
	let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
	this.topService.deleteTop(id, httpOptions)
		.subscribe(res => {
			this.modalReference.close();
			this.top = { id:'', name:'', color:'', price:'', img:''};
		});
	this.fetchData();
	  
  }
  
  
  addTopToWhishlist(top: Top) {
	let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
	console.log("enter in addTopToWhishlist");
	let jwt=localStorage.getItem('jwtToken');
	if(jwt !=null){
		let jwtData = jwt.split('.')[1]
		let decodedJwtJsonData = window.atob(jwtData);
		let decodedJwtData = JSON.parse(decodedJwtJsonData);
		console.log(decodedJwtData.name);
		console.log(decodedJwtData._id);
		this.item.userId= decodedJwtData._id;
		this.item.name=top.name;
		this.item.id=top.id ;
		this.item.color=top.color ;
		this.item.price=top.price;
		this.item.img=top.img ;
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


  editTop(top: Top) {
  }
}
