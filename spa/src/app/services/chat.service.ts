import { Injectable } from "@angular/core";
import * as io from 'socket.io-client';
//import {Observable} from 'rxjs/Observable';
import { Message } from "../models/message.model";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';



@Injectable()


export class ChatService{

	private dataStore: {
		conversation: Message[]
    };
    private socket = io("http://172.20.10.2:3000");

	constructor(private http: HttpClient) {}
	private handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
		// A client-side or network error occurred. Handle it accordingly.
			console.error('An error occurred:', error.error.message);
		} else {
		// The backend returned an unsuccessful response code.
		// The response body may contain clues as to what went wrong,
			console.error(
				`Backend returned code ${error.status}, ` +
				`body was: ${error.error}`);
		}
		// return an observable with a user-facing error message
		return throwError('Something bad happened; please try again later.');
	};
	
    joinRoom(data, httpOptions): Observable<any>
    {
        return this.http.put('/chat/joinRoom',data, httpOptions)
		.pipe(res  => {
			this.socket.emit('join',data);
			return res;
		});
    }
	
	
    leaveRoom(data, httpOptions): Observable<any>
	{
         return this.http.put('/chat/leaveRoom',data, httpOptions)
		.pipe(res  => {
			this.socket.emit('leave',data);
			return res;
		});
    }

	newUserLogin()
    {
        let observable = new Observable<any>(observer=>{
            this.socket.on('new login', (data)=>{
				console.log("entered in newUserLogin of service");
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }
	
	newUserLogout()
    {
        let observable = new Observable<any>(observer=>{
            this.socket.on('new logout', (data)=>{
				console.log("entered in newUserLogout of service");
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }
	
	newUserDeleted()
    {
        let observable = new Observable<any>(observer=>{
            this.socket.on('user deleted', (data)=>{
				console.log("entered in newUserDeleted of service");
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }
	
    newUserJoined()
    {
        let observable = new Observable<{user:String, message:String, room:String}>(observer=>{
            this.socket.on('new user joined', (data)=>{
				console.log("entered in newUserJoined of service");
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }


    userLeftRoom(){
        let observable = new Observable<{user:String, message:String, room:String}>(observer=>{
            this.socket.on('left room', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    sendMessage(data)
    {
		console.log("sendMessage")
        this.socket.emit('message',data);
    }

    newMessageReceived(){
        let observable = new Observable<Message>(observer=>{
            this.socket.on('new message', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });
		

        return observable;
    }
	
	getConversation(room, httpOptions): Observable<any>{
		console.log("entered in getConversation");
		console.log(room);
		return this.http.put('/message/getConversation',room, httpOptions)
		.pipe(
		catchError(this.handleError)
		);
		/*
		this.http.get('/getConversation').subscribe(data => {
			this.dataStore.conversation = data;
      this._todos.next(Object.assign({}, this.dataStore).todos);
    }, error => console.log('Could not load todos.'));
		*/
	}
	
	userDetails(data, httpOptions): Observable<any>{
		return this.http.put('/message/userDetails',data, httpOptions)
		.pipe(res  => {
			return res;
		});
	}
	
	like(data, httpOptions): Observable<any>{
		return this.http.put('/message/like',data, httpOptions)
		.pipe(res  => {
			this.socket.emit('like',data);
			return res;
		});
	}
	
	unlike(data, httpOptions): Observable<any>{
		return this.http.put('/message/unlike',data, httpOptions)
		.pipe(res  => {
			this.socket.emit('like',data);
			return res;
		});
	}
	
	newLikeReceived(){
        let observable = new Observable<Message>(observer=>{
            this.socket.on('new like received', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });
		

        return observable;
    }
	
	newRoomPosted(){
        let observable = new Observable<Message>(observer=>{
            this.socket.on('new room posted', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });
		

        return observable;
    }
	
	postChatRoom(data, httpOptions): Observable<any> {
		return this.http.post('/chat',data, httpOptions)
		.pipe(res  => {
			this.socket.emit('post a room',data);
			return res;
		}
    )}
	
	getChatRooms(httpOptions): Observable<any> {
		console.log("entered in getChatRooms service");
		return this.http.get('/chat/list', httpOptions)
		.pipe(res  => {
			return res;// as User[];
		})
	}
	
}