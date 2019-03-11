import { Component, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import { Message } from "../../models/message.model";
import { ChatRoom } from "../../models/chatRoom.model";
import { HttpHeaders } from '@angular/common/http';
import { FilterPipe }from '../../shared/pipes/filter.pipe'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService} from '../../services/authentication.service';
import { ViewChild, ElementRef} from '@angular/core'

@Component({
    selector: 'my-app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    providers:[ChatService, AuthenticationService]
})
export class ChatComponent implements OnInit{

	modalReference: any;
	closeResult: string;
	message = '';
	messageInfo = '';
	searchWord:string;
    user:String;
    userId:String;
    room:string;
    messageText:String;
    //messageArray:Array<{user:String,message:String,room:String}> = [];
	messageArray: Array<Message>=[];
	newdataChatRoom={newRoom:''};
	dataToSend= {room:''};
	chatRooms: any;
	myRoomToJoin:any;
	members:Array<any>=[];
	@ViewChild('scrollMe') private myScrollContainer: ElementRef;
	
	 constructor(private auth: AuthenticationService, private _chatService:ChatService, private modalService: NgbModal){
        this._chatService.newUserJoined()
        .subscribe(data=> {
			console.log("new user joined from component")
			this.fetchChatRooms(this.room);
		});
		
		this._chatService.newUserDeleted()
        .subscribe(data=> {
			console.log("new user deleted from component")
			this.fetchChatRooms(this.room);
		});
		
		this._chatService.userLeftRoom()
        .subscribe(data=> {
			console.log("new user left from component")
			this.fetchChatRooms(this.room);
		});

		this._chatService.newUserLogin()
        .subscribe(data=> {
			console.log("new user logged in from component")
			this.fetchChatRooms(this.room);
		});
		
		this._chatService.newUserLogout()
        .subscribe(data=> {
			console.log("new user logged out from component")
			this.fetchChatRooms(this.room);
		});
		
		/*
        this._chatService.userLeftRoom()
        .subscribe(data=>this.messageArray.push(data));
		*/
		
        this._chatService.newMessageReceived()
        .subscribe(data=>{
			if(data.chatRoom==this.room){
				this.messageArray.push(data);
				this.fetchData();
			}
		});
		
		this._chatService.newLikeReceived()
        .subscribe(data=>{
			this.fetchData();
		});
		
		this._chatService.newRoomPosted()
        .subscribe(data=>{
			this.fetchChatRooms(this.room);
		});
    }
  
	ngOnInit(){
		let jwtToken=localStorage.getItem('jwtToken');
		let token = JSON.parse(window.atob(jwtToken.split('.')[1]));
		this.user=token.name;
		this.userId=token._id;
		let httpOptions = {
			headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
		};
		this.fetchChatRooms('');
		
		this.auth.checkAdmin(httpOptions).subscribe(resp => {
			document.getElementById('AddChatRoom').style.visibility='visible';
		}, err=>{
			document.getElementById('AddChatRoom').style.visibility='hidden';
		});
	}
	
	fetchChatRooms(roomName){
		
		let httpOptions = {
			headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
		};
		console.log("fetchData users");
		this._chatService.getChatRooms(httpOptions)
		.subscribe(res => {
			this.chatRooms = res;
			console.log(res);
			if(roomName==''){
				this.room=this.chatRooms[0].name;
				this.roomSelected(this.room);
			}
			else{
				this.roomSelected(roomName);
			}
			//this.fetchData();
		}, err => {
		console.log( "No authorized to see users chatRooms");
		});
		
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
	
	fetchData(){
		let httpOptions = {
			headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
		};
		this.dataToSend.room=this.room;
		this._chatService.getConversation(this.dataToSend, httpOptions)
		.subscribe(data=>
			{
				console.log(data);
				let i=0;
				for(i=0; i<this.myRoomToJoin.listUsers.length; i++)
					if(this.userId==this.myRoomToJoin.listUsers[i]._id){
						document.getElementById('ActiveList').style.visibility='visible';
						this.messageInfo="";
						let convers=data.conversation;
						console.log(convers.length);
						if(convers.length>20){
							this.messageArray=[];
							let i=0;
							for(i=convers.length-20; i<convers.length; i++)
							{
								this.messageArray.push(data.conversation[i]);
							}
						}
						else{
							this.messageArray=convers;
						}
						this.scrollToBottom();
						return;
					}
				document.getElementById('ActiveList').style.visibility='hidden';
				this.messageArray=[];
				this.messageInfo="You are not in this chat group";
				
				
			});
		
	}
	
	scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { }                 
    }
	
	roomSelected(chatRoom){
		console.log("entered in rooomSelected");
		let i=0;
		for (i; i<this.chatRooms.length; i++)
			if(this.room==this.chatRooms[i].name)
				this.myRoomToJoin=this.chatRooms[i];
		this.members=this.myRoomToJoin.listUsers;
		this.fetchData();
		
	}
	
    join(){
		this.messageInfo="";
		try{
		let i;
		for(i=0; i<this.myRoomToJoin.listUsers.length; i++)
			if(this.userId==this.myRoomToJoin.listUsers[i]._id)
				throw {msg:"you already joined this room"};
		
		let httpOptions = {
			headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
		};
		let msgToSend=this.user+' has joined this '+this.myRoomToJoin.name+' room';
		this._chatService.joinRoom({room:this.myRoomToJoin, user:this.user, userId:'0', message: msgToSend}, httpOptions)
				.subscribe(data=>
				{
					//this.fetchData();
					//this.fetchChatRooms(this.room);
					//console.log('after join room');
					//console.log(this.chatRooms);
				});
		
		}
		catch(err){
			console.log(err.msg);
		}
    }

    leave(){
		this.messageInfo="";
		try{
		let i;
		let flag=false;
		for(i=0; i<this.myRoomToJoin.listUsers.length; i++)
			if(this.userId==this.myRoomToJoin.listUsers[i]._id)
				flag=true;
		if(flag==false){
			throw {msg:"you are not a member of this room"};
		}
		let httpOptions = {
			headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
		};
		let msgToSend=this.user+' has left this '+this.myRoomToJoin.name+' room';
        this._chatService.leaveRoom({room:this.myRoomToJoin, user:this.user, userId:'0', message: msgToSend}, httpOptions)
		.subscribe(data=>
			{});}
		catch(err){
			console.log(err.msg);
		}
		
    }

    sendMessage()
    {
		console.log("entered in sendMessage");
        this._chatService.sendMessage({user:this.user, userId:this.userId, room:this.room, message:this.messageText});
    }
	
	saveChatRoom() {
	let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
	console.log(this.newdataChatRoom.newRoom);
	this._chatService.postChatRoom(this.newdataChatRoom, httpOptions).subscribe(resp => {
		this.modalReference.close();
		this.message = '';
		console.log("new chat room added with success");
		//this.fetchChatRooms();
	  }, err => {
      this.message = "Chat room already exist";
	  });
	  
  }
	

}