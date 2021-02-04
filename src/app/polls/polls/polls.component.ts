import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from 'src/app/security/services/authenticate.service';
import { Poll } from 'src/app/shared/models/poll.model';
import { Room } from 'src/app/shared/models/room.model';
import { UserPoll } from 'src/app/shared/models/user-poll.model';
import { User } from 'src/app/shared/models/user.model';
import { PollService } from 'src/app/shared/services/poll.service';
import { RoomService } from 'src/app/shared/services/room.service';
import { UserPollService } from 'src/app/shared/services/user-poll.service';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss']
})
export class PollsComponent implements OnInit {
  isDetailView: boolean;
  loggedUser: User = null;
  poll: Poll;
  roomID
  pollID: number;
  UserPolls: UserPoll[] = [];
  data;
  labels = [];
  chart = [];
  loading = true;
  isPresentatorOfPoll = false;
  constructor(private _userPollService: UserPollService, private _pollService: PollService, 
    private route: ActivatedRoute, private router: Router, private _authenticateService: AuthenticateService, private _roomService: RoomService) { }

  ngOnInit(): void {
      this.isDetailView = Boolean(this.route.snapshot.queryParamMap.get('isDetailView'));
      this.pollID = Number(this.route.snapshot.paramMap.get("id"));

    this._authenticateService.loggedUser.subscribe((result) => {
      if(result != null) {
        this.loggedUser = result;
        this._pollService.getPoll(this.pollID).subscribe((poll) => {
          if(poll!=null) {
            this.roomID = poll["roomID"];
            this._roomService.getRoom(poll["roomID"]).subscribe((room) => {
              if(room!=null && (this.loggedUser["userID"] == room["presentatorID"])){
                this.isPresentatorOfPoll = true;
                poll["options"].forEach(element => {
                  this.labels.push(element["content"]);
                });
                this._userPollService.getOptionCountOnPoll(this.pollID).subscribe((data) => {
                  this.chart = data;
                  this.updateChart();
                });
              }
            });
          }     
        });      
      } 
      this.loading = false;  
    });      
  }

  updateChart(){
    this.data = {
      labels: this.labels,
      datasets: [
        {
          data: this.chart,
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ]
        }]
    };
  }

  goBackToPresentatorPanel() {
    this.router.navigate(["room/presentator/" + this.roomID]); //moet aangepast worden
  }
  goBackToRoomDetails() {
    this.router.navigate(["room/detail/" + this.roomID]);
  }
  
}
