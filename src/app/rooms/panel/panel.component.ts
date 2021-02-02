import { Component, NgZone, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from 'src/app/security/services/authenticate.service';
import { Message } from 'src/app/shared/models/message.model';
import { Poll } from 'src/app/shared/models/poll.model';
import { Room } from 'src/app/shared/models/room.model';
import { User } from 'src/app/shared/models/user.model';
import { PollService } from 'src/app/shared/services/poll.service';
import { RoomService } from 'src/app/shared/services/room.service';
import { SignalRService } from 'src/app/shared/services/signal-r.service';
import { UserInRoomService } from 'src/app/shared/services/user-in-room.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  loggedUser: User = null;
  selectedRoom: Room = null;
  lijstPolls: Poll[] = [];
  roomId: number;
  txtMessage: string = '';
  messages = new Array<Message>();
  questions = new Array<Message>();
  message = new Message();
  userId;
  username = "";
  constructor(private route: ActivatedRoute, private router: Router, private _authenticateService: AuthenticateService, private _roomService: RoomService,
    private _pollService: PollService, private _userInRoomService: UserInRoomService, private _signalRService: SignalRService, private _ngZone: NgZone, 
    public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.roomId = Number(this.route.snapshot.paramMap.get("id"));
    this._authenticateService.loggedUser.subscribe((result) => {
      if (result !== null && result !== undefined && this.roomId) {
        this.loggedUser = result;
        this._roomService.getIsRoomLive(this.roomId).subscribe((live) => {
          if (live == true) {
            this._roomService.getRoom(this.roomId).subscribe((room) => {
              if (room !== null) {
                this.selectedRoom = room;
                this.userId = result["userID"].toString();
                this.username = result["firstName"];
                if (this.loggedUser.userID == this.selectedRoom["presentatorID"]) {
                  if(this._signalRService.isConnected()){
                    console.log("blablabla")
                    this._signalRService.joinRoom(this.roomId);
                  }
                  this.subscribeToEvents();
                  this.gatherPollsFromRoom();
                } else {
                  this.router.navigate(["room/"+this.selectedRoom["roomID"]]);
                }
                  //var userInRoom = new UserInRoom();
                  //userInRoom.RoomID = this.selectedRoom["roomID"];
                  //userInRoom.UserID = result["userID"];
                  //this._userInRoomService.addUserInRoom(userInRoom).subscribe();
              }
            }, () => { console.log("Room bestaat niet."); });
          }
        });
      }
    });
  }

  openPoll(poll: Poll) {
    this._signalRService.sendPoll(poll, this.selectedRoom["roomID"]);
  }

  questionAnswered(index) {
    if (index > -1) {
      this.questions.splice(index, 1);
    }
  }

  gatherPollsFromRoom() {
    this._pollService.getAllPollsByRoomID(this.selectedRoom["roomID"]).subscribe((result) => {
      this.lijstPolls = result;
    });
  }
  stopStream() {
    if (confirm("Ben je zeker dat je de stream wil stoppen?")) {
      this.selectedRoom["live"] = false;
      this._roomService.updateRoom(this.selectedRoom['roomID'], this.selectedRoom).subscribe(() => {
        this.router.navigate(["home"]);
      });
    }
  }
  showResults(poll: Poll) {
    this.router.navigate(["polls/" + poll["pollID"]]);
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
      console.log(this.message);
      this._signalRService.sendMessageToGroup(this.message, this.roomId);
      this.txtMessage = '';
    }
  }
  private subscribeToEvents(): void {

    //nog zorgen dat enkel gesubt wordt als gebruiker een presentator is.

    this._signalRService.questionReceived.subscribe((message: Message) => {
      this._ngZone.run(() => {
        if (message["isAcceptedQuestion"]) {
          this.questions.push(message);
        }

      });
    });

    this._signalRService.messageReceived.subscribe((message: Message) => {
      this._ngZone.run(() => {
        console.log("message")
        if (message.roomId == this.roomId) {
          this.messages.push(message);
        }
      });
    });

    this._signalRService.connectionEstablished.subscribe((x: Boolean) => {
      //wachten tot een connectie gemaakt is voordat we een room joinen
      this._ngZone.run(() => {
        this._signalRService.joinRoom(this.roomId);
        console.log("join")
      });
    });
  }

}
