import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { routerTransition } from '../../router.animations';
import { AuthenticationService} from '../../services/authentication.service';


@Component({
    selector: 'app-forgotPassword',
    templateUrl: './forgotPassword.component.html',
    styleUrls: ['./forgotPassword.component.scss'],
    animations: [routerTransition()],
	providers: [AuthenticationService]
	
})
export class ForgotPasswordComponent implements OnInit {
	loginData = { mail:''};
    constructor(private auth: AuthenticationService, public router: Router) {}

    ngOnInit() {}
	
	submit()
	{
		this.auth.forgotPassword(this.loginData).subscribe(resp => {
		  this.router.navigate(['login']);
		}, err=>{
			
		});
	}
}