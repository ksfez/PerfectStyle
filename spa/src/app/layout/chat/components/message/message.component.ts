import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import {ChatService} from '../../../../services/chat.service';
import { Message } from "../../../../models/message.model";
import { HttpHeaders } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})


export class MessageComponent implements OnInit {
  @Input() message: Message;
  modalReference: any;
  closeResult: string;
  time: string;
  fadeTime: boolean;
  fromUser={mail:'', role:'', numOfLikes:0, numOfDislikes:0};
  globalInfo: boolean;
  //dataToSend= {messToSend:''};

  constructor(private modalService: NgbModal, private _chatService:ChatService) 
  { 
	
  }

  ngOnInit() {
    setTimeout(()=> {this.updateFromNow(); this.fadeTime = true}, 2000);
    setInterval(()=> {this.updateFromNow()}, 60000);
	this.checkMine(this.message);
  }

  updateFromNow(): void {
    this.time = moment(this.message.created).fromNow();
  }
  
  userDetails(userContent, userError){
	 let httpOptions = {
			headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
	  };
	  console.log("userDetails on "+this.message.from);
	  //this.dataToSend.messToSend=this.message
	  this._chatService.userDetails(this.message, httpOptions)
	  .subscribe(data=>
		{
		  console.log(data);
		  this.fromUser=data.fromUser;
		  this.openContent(userContent);
		}, err => {
			console.log("ERROR "+err);
			this.openContent(userError);
		}); 
	  
  }
  
  like(errorLikeContent){
	  let httpOptions = {
			headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
	  };
	  console.log("like the message "+this.message.text);
	  //this.dataToSend.messToSend=this.message
	  this._chatService.like(this.message, httpOptions)
	  .subscribe(data=>
		{
		  this.message=data.updatedMess;
		}, err => {
			this.openContent(errorLikeContent);
		});
  }
  
  unlike(errorDislikeContent){
	  let httpOptions = {
			headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
	  };
	  console.log("unlike the message "+this.message.text);
	  //this.dataToSend.messToSend=this.message
	  this._chatService.unlike(this.message, httpOptions)
	  .subscribe(data=>
		{
		  this.message=data.updatedMess;
		  console.log(data.updatedMess);
		}, err => {
			this.openContent(errorDislikeContent);
		});
  }
  
  checkMine(message: Message): void {
	let jwtToken=localStorage.getItem('jwtToken');
	let token = JSON.parse(window.atob(jwtToken.split('.')[1]));
    if (message.userId == token._id) {
      message.mine = true;
	  this.globalInfo=false;
    }
	if(message.userId=='0'){
	  this.globalInfo=true;
	}
	else{
	  this.globalInfo=false;
	}
  }
  
  openContent(content) {
		this.modalReference = this.modalService.open(content);
		this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
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

}
