import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ShoeService } from '../../../../services/shoe.service';
import { ItemService } from '../../../../services/item.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import Shoe from '../../../../models/shoe';
import Item from '../../../../models/item';

@Component({
  selector: 'app-shoe',
  templateUrl: './shoe.component.html',
  styleUrls: ['./shoe.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShoeComponent implements OnInit {
  shoes: Shoe[] = [];
  modalReference: any;
  closeResult: string;
  message = '';
  shoe = { id:'', name:'', color:'', price:'', img:''};
  //item = { id:"", name:"", color:"", price:"", img:"", userId:""};
  item:Item =new Item();
  role='';
    
  constructor(public router: Router, private shoeService: ShoeService ,private itemService: ItemService , private modalService: NgbModal) { }
  
  open(content) {
		this.modalReference = this.modalService.open(content);
		this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
	
	openDelete(content,shoe) {
		this.modalReference = this.modalService.open(content);
		this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
		this.shoe=shoe;
		console.log("shoe");
		console.log(this.shoe);
		
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
  
  ngOnInit() {
	
    this.shoeService.getShoes()
      .subscribe(res => {
        this.shoes = res;
        console.log(res);
      });
	  
	if(this.getJwtToken()==1)
	{
		document.getElementById('AddShoe').style.visibility='visible';
		//document.getElementById('DeleteShoe').style.visibility='visible';
	}
  }
  
  fetchData() {
	  
	console.log("entered in fetchData");
    this.shoeService.getShoes()
      .subscribe(res => {
        this.shoes = res;
      });
	  this.router.navigate(['shoesList']);
  }

  saveShoe() {
	let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
	
		this.shoeService.postShoe(this.shoe, httpOptions).subscribe(resp => {
		this.modalReference.close();
		this.message = '';
		this.shoe = { id:'', name:'', color:'', price:'', img:''};
		this.fetchData();
		
	  }, err => {
      this.message = "Shoes already exist";
	  });
  }

  deleteShoe(id: string) {
	let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
	console.log("enter in shoe delete");
	console.log("shoe id to delete");
	console.log(id);
	this.shoeService.deleteShoe(id, httpOptions)
		.subscribe(res => {
			this.modalReference.close();
			this.shoe = { id:'', name:'', color:'', price:'', img:''};
		});
	this.fetchData();
	  
  }
  
  
  addShoeToWhishlist(shoe: Shoe) {
	let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
	console.log("enter in addShoeToWhishlist");
	let jwt=localStorage.getItem('jwtToken');
	if(jwt !=null){
		let jwtData = jwt.split('.')[1]
		let decodedJwtJsonData = window.atob(jwtData);
		let decodedJwtData = JSON.parse(decodedJwtJsonData);
		console.log(decodedJwtData.name);
		console.log(decodedJwtData._id);
		this.item.userId= decodedJwtData._id;
		this.item.name=shoe.name;
		this.item.id=shoe.id ;
		this.item.color=shoe.color ;
		this.item.price=shoe.price;
		this.item.img=shoe.img ;
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


  editShoe(shoe: Shoe) {
  }
}
