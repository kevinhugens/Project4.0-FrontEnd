import { EventEmitter, Injectable } from '@angular/core';  
import { HubConnection, HubConnectionBuilder, IHttpConnectionOptions } from '@aspnet/signalr';  
import {Message} from 'src/app/shared/models/message.model'
import { environment } from '../../../environments/environment';
import { Poll } from '../models/poll.model';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  apiUrl = environment.apiLink;
  messageReceived = new EventEmitter<Message>();  
  connectionEstablished = new EventEmitter<Boolean>();  
  pollReceived = new EventEmitter<Poll>();
  questionReceived = new EventEmitter<Poll>();

  private connectionIsEstablished = false;  
  private _hubConnection: HubConnection;  

  constructor() {  
    this.createConnection();  
    this.registerOnServerEvents();  
    this.startConnection();  
  }  

  sendMessage(message: Message) {  
    this._hubConnection.invoke('SendMessageAsync', message);  
  }  
  sendPoll(poll: Poll, roomID: number) {
    this._hubConnection.invoke("SendPollAsync", poll, roomID.toString());
  }
  sendMessageToGroup(message: Message, roomID: number) {  
    this._hubConnection.invoke('SendMessageToRoomAsync', message, roomID.toString());  
  }  

  sendQuestion(message: Message, roomID: number) {  
    this._hubConnection.invoke('SendQuestionAsync', message, roomID.toString());  
  } 

  isConnected(){
    return this.connectionIsEstablished
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
        this.connectionEstablished.emit(true); 
        
      })  
      .catch(err => {
        setTimeout(function () { this.startConnection(); }, 5);  
      });  
  }  

  public joinRoom(roomID: number): void{
    this._hubConnection.invoke('JoinRoom', roomID.toString()); 
  }
  
  private registerOnServerEvents(): void {  
    this._hubConnection.on('RecievedCon', () => {  
      console.log('Verbonden met live chat groep');
    });  
    this._hubConnection.on('RecieveMessage', (data: any) => {  
      this.messageReceived.emit(data);
    }); 
    this._hubConnection.on("ReceivePoll", (data: any) => {
      this.pollReceived.emit(data);
    });
    this._hubConnection.on("ReceiveQuestion", (data: any) => {
      this.questionReceived.emit(data);
    });
  }  
}
