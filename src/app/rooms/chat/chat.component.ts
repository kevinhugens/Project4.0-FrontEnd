import { Component, OnInit, NgZone } from '@angular/core';
import { SignalRService } from 'src/app/shared/services/signal-r.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Message} from 'src/app/shared/models/message.model'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  apiUrl = environment.apiLink;
  title = 'ClientApp';  
  txtMessage: string = '';  
  uniqueID: string = new Date().getTime().toString();  
  messages = new Array<Message>();  
  message = new Message();  
  constructor(  
    private signalRService: SignalRService,  
    private _ngZone: NgZone  
  ) {  
    this.subscribeToEvents();  
  }  
  sendMessage(): void {  
    if (this.txtMessage) {  
      this.message = new Message();  
      this.message.MessageId = this.uniqueID;  
      this.message.type = "sent";  
      this.message.message = this.txtMessage;  
      this.message.date = new Date();  
      this.messages.push(this.message);  
      this.signalRService.sendMessage(this.message);  
      this.txtMessage = '';  
    }  
  }  
  private subscribeToEvents(): void {  
  
    this.signalRService.messageReceived.subscribe((message: Message) => {  
      this._ngZone.run(() => {  
        if (message.MessageId !== this.uniqueID) {  
          message.type = "received";  
          this.messages.push(message);  
        }  
      });  
    });  
  }  

  ngOnInit(): void {
  }

}
