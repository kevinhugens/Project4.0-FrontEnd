import { Component, OnInit, NgZone, Input } from '@angular/core';
import { SignalRService } from 'src/app/shared/services/signal-r.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Message} from 'src/app/shared/models/message.model'
import { AuthenticateService } from 'src/app/security/services/authenticate.service';
import { UserInRoom } from 'src/app/shared/models/user-in-room.model';
import { UserInRoomService } from 'src/app/shared/services/user-in-room.service';
import { Room } from 'src/app/shared/models/room.model';
import { RoomService } from 'src/app/shared/services/room.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() roomId: number;
  @Input() hideQstButton: Boolean = false;
  modId =-1; //
  apiUrl = environment.apiLink;
  title = 'ClientApp';  
  txtMessage: string = '';
  messages = new Array<Message>();  
  message = new Message();  
  userId;
  username ="";
  lastMessageRecievedTime = new Date(0);
  isQuestion: boolean = false;
  constructor(  
    private signalRService: SignalRService,  
    private _ngZone: NgZone  ,
    private _authenticateService: AuthenticateService,
    private _userInRoomService: UserInRoomService,
    private _roomService: RoomService
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
    console.log("test");
    console.log(this.isQuestion);
    console.log(this.txtMessage);
    if (this.txtMessage) {  
      this.message = new Message();  
      this.message.clientuniqueid = this.userId;  
      this.message.roomId = this.roomId;  
      this.message.message = this.txtMessage;  
      this.message.date = new Date();  
      this.message.username = this.username; 
      this.message.IsQuestion = this.isQuestion;
      if(this.isQuestion){
        if(this.modId == -1){
          this.message.IsValidatedQuestion = true;
          this.message.IsAcceptedQuestion = true;
           //als er geen moderator is wordt de vraag meteen doorgestuurd naar de presentator
           this.signalRService.sendQuestion(this.message, this.roomId)
           this.txtMessage = '';  
           this.isQuestion = false;
        }else{
          this.message.IsValidatedQuestion = false;
          this.txtMessage = '';  
           this.isQuestion = false;
           this.signalRService.sendMessageToGroup(this.message, this.roomId);  //een moderator kijkt op een message of het een vraag is, niet met de sendQuestionfunctie dus.
        }
      }else{
        console.log(this.message);
        this.signalRService.sendMessageToGroup(this.message, this.roomId);  
        this.txtMessage = '';  
      }
      
      
      
    }  
  }  
  AcceptQuestion(index){
    this.messages[index].IsValidatedQuestion = true;
    this.messages[index].IsAcceptedQuestion = true;
    this.signalRService.sendQuestion(this.messages[index], this.roomId);
  }
  RejectQuestion(index){
    this.messages[index].IsValidatedQuestion = true;
    this.messages[index].IsAcceptedQuestion = false;
    this.signalRService.sendQuestion(this.messages[index], this.roomId);
  }
  private subscribeToEvents(): void {  
  
    this.signalRService.messageReceived.subscribe((message: Message) => {  
      this._ngZone.run(() => {  
        if (message.roomId == this.roomId) {  
          this.messages.push(message); 
          this.lastMessageRecievedTime = message.date //voor te kijken of het uur moet laten gezien worden.
        }
      });  
    });  

    this.signalRService.connectionEstablished.subscribe((x: Boolean) => {  
      //wachten tot een connectie gemaakt is voordat we een room joinen
      this._ngZone.run(() => {  
        this.signalRService.joinRoom(this.roomId);
      });  
    });  

    this.signalRService.questionReceived.subscribe((message: Message) => {  
      this._ngZone.run(() => {   
          console.log(message)
      });  
    });  
  }  

  ngOnInit(): void {
    this._roomService.getRoom(this.roomId).subscribe(result =>{
      if(result["moderatorID"]!= null) {
        this.modId = result["moderatorID"];
        
      }
      console.log("mod: "+this.modId)
    })
  }

}
