import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { routerTransition } from '../../router.animations';
import { AuthenticationService} from '../../services/authentication.service';
import { HttpHeaders } from '@angular/common/http';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()],
	providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {
	loginData = { mail:'', password:'' };
	message = '';
	data: any;
	name="";
	role="";
    constructor(private auth: AuthenticationService, public router: Router) {}

    ngOnInit() {}

    login() {
		
		this.auth.login(this.loginData).subscribe(resp => {
		  this.data = resp;
		  localStorage.setItem('jwtToken', this.data.token);
		  this.CheckConnection();
		  this.CheckAdmin();
		  this.router.navigate(['dashboard']);
		}, err => {
		this.message = 'Authentication failed. User not found.';
		});		
	}
	
	CheckAdmin(){
		let httpOptions = {
			headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
		};
		this.auth.checkAdmin(httpOptions).subscribe(resp => {
			document.getElementById('UsersSideBar').style.visibility='visible';
		}, err=>{});
	}
	
	CheckConnection(){
		let httpOptions = {
			headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
		};
		this.auth.checkConnection(httpOptions).subscribe(resp => {
			this.data=resp;
			this.name=this.data.token;
			console.log(this.name);
			document.getElementById('MyLogIn').style.visibility='hidden';
			document.getElementById('MyProfile').style.visibility='visible';
			document.getElementById('MyName').textContent=this.name +"'s account";
		}, err=>{});
	}
}