import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { HttpHeaders } from '@angular/common/http';
import User from '../../../../models/user';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
import { FileService } from '../../../../services/file.service';
import {saveAs} from 'file-saver';

const uri = '/file/upload';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers:[FileService]
})
export class UserComponent implements OnInit {
	
  uploader:FileUploader = new FileUploader({url:uri});
 file={filename:''};
  attachmentList:any = [];
  
  modalReference: any;
  //users: User[]=[];
  users: any;
  closeResult: string;
  message = '';
  user = {name:'', mail:'', password:'', role:'', branch:'', img:''};
  
  constructor(private _fileService:FileService, private userService: UserService, private modalService: NgbModal, private router: Router) {
	this.uploader.onCompleteItem = (item:any, response:any , status:any, headers:any) => {
            this.attachmentList.push(JSON.parse(response));
        }
  }
  
  open(content) {
		this.modalReference = this.modalService.open(content);
		this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
	
	openDelete(content,user) {
		this.modalReference = this.modalService.open(content);
		this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
		this.user=user;
		
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
  
  ngOnInit() {
	 
	this.fetchData();
  }
  
  
  download(filename){
		console.log(filename);
        this._fileService.downloadFile(filename)
        .subscribe(
            data => saveAs(data, filename),
            error => console.error(error)
        );
    }
	
	
  fetchData() {
	let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
	console.log("fetchData users");
    this.userService.getUsers(httpOptions)
      .subscribe(res => {
        this.users = res;
        console.log(res);
	  }, err => {
      console.log( "No authorized to see users list");
      });
  
  }
  
  

  deleteUser(id: string) {
	let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    this.userService.deleteUser(id, httpOptions)
      .subscribe(res => {
        console.log(res);
		this.modalReference.close();
		this.user = {name:'', mail:'', password:'', role:'', branch:'', img:''};
      });
	this.fetchData();
  }

  editUser(user: User) {
  }
  
getFileUrl(index)
{
    	
}
  
  
  
  
  saveUser() {
	let index=this.attachmentList.length-1;
	var filename = this.attachmentList[index].uploadname;
	this.file.filename=filename;
	this.user.img=this.file.filename;
	let httpOptions = {
		headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
	};
	this.userService.postUser(this.user, httpOptions).subscribe(resp => {
	this.modalReference.close();
	this.message = '';
	this.user = {name:'', mail:'', password:'', role:'', branch:'', img:''};
	this.fetchData();
	},
	err => {
	this.message = "User already exist";
	}); 
  }
  
  AdminClick(){
	  this.user.role='Admin';
	  document.getElementById('storeNum').style.visibility='visible';
  }
  
  CustomerClick(){
	  this.user.role='Customer';
	  document.getElementById('storeNum').style.visibility='hidden';
  }
  
  
}
