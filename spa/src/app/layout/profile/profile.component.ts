import { Component } from '@angular/core';
import { AuthenticationService} from '../../services/authentication.service';
import { UserService} from '../../services/user.service';
import User from '../../models/user';
import { Router } from "@angular/router";
import { HttpHeaders } from '@angular/common/http';
import {saveAs} from 'file-saver';
import { FileService } from '../../services/file.service';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';

const uri = '/file/upload';


@Component({
  templateUrl: './profile.component.html',
  providers:[AuthenticationService,FileService]
})
export class ProfileComponent {
  updateData= {id:'', name:'', mail:'', password:'', role:'', branch:0, img:""};;
  message = '';
  passwordData={password:''};
  data: any;
  uploader:FileUploader = new FileUploader({url:uri});
  file={filename:''};
  attachmentList:any = [];
  
  
  constructor(private _fileService:FileService, private auth: AuthenticationService, private userService: UserService, private router: Router) {
	  this.uploader.onCompleteItem = (item:any, response:any , status:any, headers:any) => {
            this.attachmentList.push(JSON.parse(response));
        }
  }
  
  
  ngOnInit() {    
   let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    this.auth.profile(httpOptions).subscribe(user => {
		
		let jwt=localStorage.getItem('jwtToken');
		let jwtData = jwt.split('.')[1]
		let decodedJwtJsonData = window.atob(jwtData);
		let decodedJwtData = JSON.parse(decodedJwtJsonData);
		this.updateData.id = decodedJwtData._id;
		this.updateData.name = decodedJwtData.name;
		this.updateData.mail = decodedJwtData.mail;
		//this.updateData.password = decodedJwtData.password;
		this.updateData.role = decodedJwtData.role;
		this.updateData.img = decodedJwtData.img;
		this.updateData.branch = decodedJwtData.branch;
		
    }, (err) => {
      console.error(err);
    });
  }
  
  update() {
	  let index=this.attachmentList.length-1;
	  var filename = this.attachmentList[index].uploadname;
	  this.file.filename=filename;
      this.updateData.img=this.file.filename;
	  
	 let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
	if(this.updateData.password==this.passwordData.password)
	  {
	  this.userService.updateUser(this.updateData.id, this.updateData, httpOptions).subscribe(resp => {
		localStorage.removeItem('jwtToken');
		this.data = resp;
		localStorage.setItem('jwtToken', this.data.token);
		console.log("update with success");
		this.router.navigate(['dashboard']); //to redirect to dashboard page
	  }, err => {
      this.message = "Mail already exists";
	  });
	  }
	  else
	  {
		 this.message = 'Does not match password'
	  }
  }
  
  
}
