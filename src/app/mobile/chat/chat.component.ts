import { Component, OnInit, NgZone, Input } from '@angular/core';
import { SignalRService } from 'src/app/shared/services/signal-r.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Message} from 'src/app/shared/models/message.model'
import { AuthenticateService } from 'src/app/security/services/authenticate.service';
import { UserInRoom } from 'src/app/shared/models/user-in-room.model';
import { UserInRoomService } from 'src/app/shared/services/user-in-room.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() roomId: number;
  apiUrl = environment.apiLink;
  title = 'ClientApp';  
  txtMessage: string = '';
  messages = new Array<Message>();  
  message = new Message();  
  userId;
  username ="";
  constructor(  
    private signalRService: SignalRService,  
    private _ngZone: NgZone  ,
    private _authenticateService: AuthenticateService,
    private _userInRoomService: UserInRoomService
  ) {
    this._authenticateService.loggedUser.subscribe(
      result => {
        if(result!= null) {
          this.userId = result["userID"].toString();
          this.username = result["firstName"];
        }
      }
    );
    this.subscribeToEvents();  
  }  
  sendMessage(): void {  
    if (this.txtMessage) {  
      this.message = new Message();  
      this.message.clientuniqueid = this.userId;  
      this.message.roomId = this.roomId;  
      this.message.message = this.txtMessage;  
      this.message.date = new Date();  
      this.message.username = this.username; 
      //this.messages.push(this.message);  
      //in comments voor doubles te vermijden. Kan wel intresant zijn voor de gebruiker zijn als het bericht niet aankomt dat er dan een
      //teken bij het bericht komt te staan.
      console.log(this.message)
      this.signalRService.sendMessageToGroup(this.message, this.roomId);  
      this.txtMessage = '';  
    }  
  }  
  private subscribeToEvents(): void {  
  
    this.signalRService.messageReceived.subscribe((message: Message) => {  
      this._ngZone.run(() => {  
        if (message.roomId == this.roomId) {  
          this.messages.push(message);  
        }
      });  
    });  

    this.signalRService.connectionEstablished.subscribe((x: Boolean) => {  
      //wachten tot een connectie gemaakt is voordat we een room joinen
      this._ngZone.run(() => {  
        this.signalRService.joinRoom(this.roomId);
        //Userroom opvullen in database
        
        var userInRoom = new UserInRoom();
          userInRoom.RoomID = this.roomId;
          userInRoom.UserID = Number(this.userId);
          console.log(userInRoom);
          this._userInRoomService.UserInRoomExists(Number(this.userId),this.roomId).subscribe(result =>{
            if(result){
              //kijk hier of user gekickt is.
              console.log("gebruiker al in room")
            }else{
              this._userInRoomService.addUserInRoom(userInRoom).subscribe();
            }
          });
          
      });  
    });  
  }  

  ngOnInit(): void {
    
  }

}
