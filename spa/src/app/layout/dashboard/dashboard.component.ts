import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AuthenticationService} from '../../services/authentication.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()],
	providers: [AuthenticationService]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
	message = '';
	data: any;
	name="";
	role="";

    constructor(private auth: AuthenticationService) {
        this.sliders.push(
            {
                imagePath: 'assets/images/slider1.jpg',
                label: 'ALL SHOES',
                text:
                    'Spring into the next season with stylish heels and footwear.'
            },
            {
                imagePath: 'assets/images/slider2.jpg',
                label: 'ALL ACCESSORIES',
                text: 'Complete your look with statement jewelry, versatile bags and seasonal staples.'
            },
            {
                imagePath: 'assets/images/slider3.jpg',
                label: 'ALL DRESSES',
                text:
                    'Find your look for all occasions.'
            }
        );

        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            },
            {
                id: 2,
                type: 'warning',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );
    }

    ngOnInit() {
		if(localStorage.getItem('jwtToken')!=null)
		{
			console.log("connected again");
			this.CheckConnection();
			this.CheckAdmin();
		}
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

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
