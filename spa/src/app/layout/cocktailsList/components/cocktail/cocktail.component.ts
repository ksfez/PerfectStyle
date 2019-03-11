import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { CocktailService } from '../../../../services/cocktail.service';
import { ItemService } from '../../../../services/item.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import Cocktail from '../../../../models/cocktail';
import Item from '../../../../models/item';

@Component({
  selector: 'app-cocktail',
  templateUrl: './cocktail.component.html',
  styleUrls: ['./cocktail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CocktailComponent implements OnInit {
  cocktails: Cocktail[] = [];
  modalReference: any;
  closeResult: string;
  message = '';
  cocktail = { id:'', name:'', color:'', price:'', img:''};
  //item = { id:"", name:"", color:"", price:"", img:"", userId:""};
  item:Item =new Item();
  role='';
    
  constructor(public router: Router, private cocktailService: CocktailService, private itemService: ItemService , private modalService: NgbModal) { }
  
  open(content) {
		this.modalReference = this.modalService.open(content);
		this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
	
	openDelete(content,cocktail) {
		this.modalReference = this.modalService.open(content);
		this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
		this.cocktail=cocktail;
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
	
    this.cocktailService.getCocktails()
      .subscribe(res => {
        this.cocktails = res;
        console.log(res);
      });
	  
	if(this.getJwtToken()==1)
	{
		document.getElementById('AddCocktail').style.visibility='visible';
	}
  }
  
  fetchData() {
	  
	console.log("entered in fetchData");
    this.cocktailService.getCocktails()
      .subscribe(res => {
        this.cocktails = res;
      });
	  this.router.navigate(['cocktailsList']);
  }

  saveCocktail() {
	let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
	
		this.cocktailService.postCocktail(this.cocktail, httpOptions).subscribe(resp => {
		this.modalReference.close();
		this.message = '';
		this.cocktail = { id:'', name:'', color:'', price:'', img:''};
		this.fetchData();
		
	  }, err => {
      this.message = "Cocktails already exist";
	  });
  }

  deleteCocktail(id: string) {
	let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
	this.cocktailService.deleteCocktail(id, httpOptions)
		.subscribe(res => {
			this.modalReference.close();
			this.cocktail = { id:'', name:'', color:'', price:'', img:''};
		});
	this.fetchData();
	  
  }
  
  
  addCocktailToWhishlist(cocktail: Cocktail) {
	let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
	console.log("enter in addCocktailToWhishlist");
	let jwt=localStorage.getItem('jwtToken');
	if(jwt !=null){
		let jwtData = jwt.split('.')[1]
		let decodedJwtJsonData = window.atob(jwtData);
		let decodedJwtData = JSON.parse(decodedJwtJsonData);
		console.log(decodedJwtData.name);
		console.log(decodedJwtData._id);
		this.item.userId= decodedJwtData._id;
		this.item.name=cocktail.name;
		this.item.id=cocktail.id ;
		this.item.color=cocktail.color ;
		this.item.price=cocktail.price;
		this.item.img=cocktail.img ;
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


  editCocktail(cocktail: Cocktail) {
  }
}
