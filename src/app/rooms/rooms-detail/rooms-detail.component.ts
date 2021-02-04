import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from 'src/app/security/services/authenticate.service';
import { Poll } from 'src/app/shared/models/poll.model';
import { Room } from 'src/app/shared/models/room.model';
import { UserInRoom } from 'src/app/shared/models/user-in-room.model';
import { User } from 'src/app/shared/models/user.model';
import {PollService} from 'src/app/shared/services/poll.service';
import { RoomService } from 'src/app/shared/services/room.service';
import { UserInRoomService } from 'src/app/shared/services/user-in-room.service';

@Component({
  selector: 'app-rooms-detail',
  templateUrl: './rooms-detail.component.html',
  styleUrls: ['./rooms-detail.component.scss']
})
export class RoomsDetailComponent implements OnInit {

  roomId;
  loggedUser;
  room:Room;
  userInRoomList: UserInRoom[] = [];
  lijstPolls: Poll[] = [];
  loading = true;

  constructor(private route: ActivatedRoute,private router: Router, private _authenticateService: AuthenticateService, private _roomService: RoomService,
    private _userInRoomService: UserInRoomService, private _pollService: PollService,) { }

  ngOnInit(): void {
    this.roomId = Number(this.route.snapshot.paramMap.get("id"));
    this._authenticateService.loggedUser.subscribe((result) => {
      if (result !== null && result !== undefined && this.roomId) {
        this.loggedUser = result;
        
            this._roomService.getRoom(this.roomId).subscribe((room) => {
              if (room !== null) {
                this.room = room;
                console.log(room)
                if (this.loggedUser.userID == this.room["presentatorID"]) {
                  //get users in room
                  this._userInRoomService.getAllUsersInRoom(this.roomId).subscribe(result=>{
                    this.userInRoomList = result;
                    console.log(result);
                    this.loading =false;
                  });
                  //get polls of room
                  this._pollService.getAllPollsByRoomID(this.roomId).subscribe((result) => {
                    this.lijstPolls = result;
                    this.loading =false;
                  });
                } else {
                  this.router.navigate(["history"])
                }
              }
            }, () => { console.log("Room bestaat niet."); });
      }
    });
  }

  showResults(poll: Poll){
    this.router.navigate(["polls/" + poll["pollID"]],{queryParams: {isDetailView: true}});
  }
}
