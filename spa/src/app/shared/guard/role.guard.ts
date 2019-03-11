import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate() {
		let jwtToken=localStorage.getItem('jwtToken');
        if (jwtToken) {
			let token = JSON.parse(window.atob(jwtToken.split('.')[1]));
			if(token.role=="Admin")
				return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
