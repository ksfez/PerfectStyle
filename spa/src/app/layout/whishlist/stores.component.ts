import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { routerTransition } from '../../router.animations';
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';
import { HttpClient } from '@angular/common/http';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';
import { ItemService } from '../../services/item.service';
import { DataSource } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import Item from '../../models/item';
import * as ol from 'openlayers';


@Component({
    selector: 'app-stores',
    templateUrl: './stores.component.html',
    styleUrls: ['./stores.component.scss'],
    animations: [routerTransition()]
})
export class StoresComponent implements OnInit {
	public payPalConfig?: PayPalConfig;
	items: Item[] = [];
	itemsTmp: Item[] = [];
	itemsTmp2: Item[] = [];
	message = '';
	item = { id:'', name:'', color:'', price:'', img:''};
	role='';
	id='';
    
	constructor(public router: Router, private itemService: ItemService) { }
  
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
	
	 ngOnInit(): void {
		let jwt=localStorage.getItem('jwtToken');
		let jwtData = jwt.split('.')[1]
		let decodedJwtJsonData = window.atob(jwtData);
		let decodedJwtData = JSON.parse(decodedJwtJsonData);
		this.id = decodedJwtData._id;
		this.itemService.getItems().subscribe(res => {
			
			console.log("init whishlist");
			console.log("res " + res);
        this.itemsTmp = res;
		let length=this.itemsTmp.length;
		
		let j=0;
		for ( var k = 0; k < length; k++) {
			if (this.itemsTmp[k].userId == this.id) {
				this.items[j]=this.itemsTmp[k];
				console.log("name " + this.itemsTmp[k].name);
				j=j+1;	
			}
		}
		console.log("items " + this.items);
      });
	
      this.initConfig();
    }
	
	private initConfig(): void {
      this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
        commit: true,
        client: {
          sandbox: 'AXzYCgRhyYSCLevjq6s1NNmS42savksrOay54edduN9b_47k_gJGY-LkfKTTAww9KAu5GcnHUCUIFNCN'
        },
        button: {
          label: 'paypal',
        },
        onPaymentComplete: (data, actions) => {
          console.log('OnPaymentComplete');
        },
        onCancel: (data, actions) => {
          console.log('OnCancel');
        },
        onError: (err) => {
          console.log('OnError');
        },
        transactions: [{
          amount: {
            currency: 'USD',
            total: 9
          }
        }]
      });
    }
	
	fetchData() {
	//this.items=[];
	let jwt=localStorage.getItem('jwtToken');
		let jwtData = jwt.split('.')[1]
		let decodedJwtJsonData = window.atob(jwtData);
		let decodedJwtData = JSON.parse(decodedJwtJsonData);
		this.id = decodedJwtData._id;
		this.itemService.getItems().subscribe(res => {
			
			console.log("init whishlist");
			console.log("res " + res);
        this.itemsTmp = res;
		let length=this.itemsTmp.length;
		
		let j=0;
		for ( var k = 0; k < length; k++) {
			if (this.itemsTmp[k].userId == this.id) {
				this.itemsTmp2[j]=this.itemsTmp[k];
				//console.log("name " + this.itemsTmp[k].name);
				j=j+1;	
			}
			
		}
		this.items=this.itemsTmp2;
		console.log("items " + this.items);
      });
  }

  saveItem() {
	let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
	console.log("entered in saveItem");
		this.itemService.postItem(this.item, httpOptions).subscribe(resp => {
		this.message = '';
		this.item = { id:'', name:'', color:'', price:'', img:''};
		this.fetchData();
		
	  }, err => {
      this.message = "Item already exist";
	  });
  }

  deleteItem(id: string) {
	let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
	this.itemService.deleteItem(id, httpOptions)
		.subscribe(res => {
			this.fetchData();
		});
	  
  }

  editItem(item: Item) {
  }
 


}