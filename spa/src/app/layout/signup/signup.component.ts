import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { AuthenticationService} from '../../services/authentication.service';
import { HttpClient, HttpEventType} from '@angular/common/http';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
import { FileService } from '../../services/file.service';
import {saveAs} from 'file-saver';

const uri = '/file/upload';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()],
	providers: [AuthenticationService,FileService]
})
export class SignupComponent implements OnInit {

	uploader:FileUploader = new FileUploader({url:uri});
    file={filename:''};
    attachmentList:any = [];
	
    signupData = { name:'', mail:'', password:'', role:'Customer', branch:'',img:''};
	passwordData={password:''};
    message = '';
    constructor(private _fileService:FileService, private http:HttpClient, private auth: AuthenticationService, private router: Router) { 
		this.uploader.onCompleteItem = (item:any, response:any , status:any, headers:any) => {
            this.attachmentList.push(JSON.parse(response));
        }
		
	}

    ngOnInit() {
    }
	
    signup() 
	{
	  let index=this.attachmentList.length-1;
	  var filename = this.attachmentList[index].uploadname;
	  this.file.filename=filename;
      this.signupData.img=this.file.filename;
	  if(this.signupData.password==this.passwordData.password)
	  {
      this.auth.signup(this.signupData).subscribe(resp => {
		  this.auth.forgotPassword(this.signupData).subscribe(resp => {
		  this.router.navigate(['login']);
			}, err=>{
			});
		}, err => {
		this.message = "Mail already exists";
	  });
	  }
	  else
	  {
		 this.message = 'Does not match password'
	  }
	  
	}


	/*comparePassword(){
		while(this.signupData.password!=this.password)
			this.message = 'Does not match password';
		if(this.signupData.password==this.password){
			this.message="";
			return true;
		}
		else
			return false;
	}*/
	
}
