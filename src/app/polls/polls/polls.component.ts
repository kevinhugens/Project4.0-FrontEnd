import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Poll } from 'src/app/shared/models/poll.model';
import { Room } from 'src/app/shared/models/room.model';
import { UserPoll } from 'src/app/shared/models/user-poll.model';
import { PollService } from 'src/app/shared/services/poll.service';
import { RoomService } from 'src/app/shared/services/room.service';
import { UserPollService } from 'src/app/shared/services/user-poll.service';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss']
})
export class PollsComponent implements OnInit {
  poll: Poll;
  pollID: number;
  UserPolls: UserPoll[] = [];
  data;
  labels = [];
  chart = [];
  constructor(private _userPollService: UserPollService, private _pollService: PollService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.pollID = Number(this.route.snapshot.paramMap.get("id"));
    this._pollService.getPoll(this.pollID).subscribe((result) => {
      this.poll = result;
      if(result!=null){
        result["options"].forEach(element => {
          this.labels.push(element["content"]);
        });
        this.updateChart();
      }
    });
    this._userPollService.getOptionCountOnPoll(this.pollID).subscribe((data) => {
      this.chart = data;
      this.updateChart();
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
    this.router.navigate(["room"]);
  }
  
}
