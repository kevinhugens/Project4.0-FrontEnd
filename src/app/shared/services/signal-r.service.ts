import { EventEmitter, Injectable } from '@angular/core';  
import { HubConnection, HubConnectionBuilder, IHttpConnectionOptions } from '@aspnet/signalr';  
import {Message} from 'src/app/shared/models/message.model'
import { environment } from '../../../environments/environment';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {


  apiUrl = environment.apiLink;
  messageReceived = new EventEmitter<Message>();  
  connectionEstablished = new EventEmitter<Boolean>();  
  
  private connectionIsEstablished = false;  
  private _hubConnection: HubConnection;  

  constructor() {  
    this.createConnection();  
    this.registerOnServerEvents();  
    this.startConnection();  
  }  

  sendMessage(message: Message) {  
    this._hubConnection.invoke('SendMessageAsync', message.message);  
  }  
  
  private createConnection() {  
    this._hubConnection = new HubConnectionBuilder()  
      .withUrl(this.apiUrl + 'chat', {
        accessTokenFactory: () => {
          return window.localStorage.getItem('token'); },
      } as IHttpConnectionOptions) 
      .build();  
  }  
  
  private startConnection(): void {  
    this._hubConnection  
      .start()  
      .then(() => {  
        this.connectionIsEstablished = true;  
        console.log('Hub connection started');  
        this.connectionEstablished.emit(true);  
      })  
      .catch(err => {  
        console.log('Error while establishing connection, retrying...');  
        console.log(err);  
        setTimeout(function () { this.startConnection(); }, 5);  
      });  
  }  
  
  private registerOnServerEvents(): void {  
    this._hubConnection.on('RecievedCon', (data: any) => {  
      this.messageReceived.emit(data);  
      console.log('wubalubadubdub'); 
    });  
    this._hubConnection.on('RecieveMessage', (data: any) => {  
      this.messageReceived.emit(data);  
      console.log(data); 
    }); 
  }  
}
