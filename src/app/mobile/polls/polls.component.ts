import { Component, Input, NgZone, OnInit } from '@angular/core';
import { Poll } from 'src/app/shared/models/poll.model';
import { PollService } from 'src/app/shared/services/poll.service';
import { SignalRService } from 'src/app/shared/services/signal-r.service';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss']
})
export class PollsComponent implements OnInit {
  polls: Poll[];
  activePollForThisRoom: Poll;
  @Input() roomID: number;
  constructor(private _pollService: PollService,private _signalRService: SignalRService, private _ngZone: NgZone,) { }

  ngOnInit(): void {
    // this._pollService.activeMobilePoll.subscribe((data) => {
    //   this.polls = data;
    //   console.log("data",data);
    //   if(data != null && data.length>0) {
    //     for (let index = 0; index < data.length; index++) {
    //       const element = data[index];
    //       if(element["pollID"] == this.roomID){
    //         console.log("poll gevonden");
    //         console.log(element);
    //       }
    //     }
    //   }
    // });
    this.subscribeToEvents();
  }

  private subscribeToEvents(): void {  
  
    this._signalRService.pollReceived.subscribe((poll: Poll) => {  
      this._ngZone.run(() => {  
        this.activePollForThisRoom = poll;
      });  
    });  
  }  

}
