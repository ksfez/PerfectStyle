import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService} from '../../../services/authentication.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
	providers: [AuthenticationService]
})
export class HeaderComponent implements OnInit {
    pushRightClass: string = 'push-right';

    constructor(private auth: AuthenticationService, private translate: TranslateService, public router: Router) {

        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {}

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
		let httpOptions = {
			headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
		};
		this.auth.logOut(httpOptions).subscribe(resp => {
			localStorage.removeItem('jwtToken');
			this.CheckConnection();
		}, err=>{
			console.log("Unable to log out");
		});
        
    }

	CheckConnection(){
		let httpOptions = {
			headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
		};
		this.auth.checkConnection(httpOptions).subscribe(resp => {
		}, err=>{
			document.getElementById('MyProfile').style.visibility='hidden';
			document.getElementById('MyLogIn').style.visibility='visible';
			document.getElementById('UsersSideBar').style.visibility='hidden';
		});
	}
	
    changeLang(language: string) {
        this.translate.use(language);
    }
}
