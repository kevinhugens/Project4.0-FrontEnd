import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticateService } from 'src/app/security/services/authenticate.service';

@Component({
  selector: 'app-mobile-room',
  templateUrl: './mobile-room.component.html',
  styleUrls: ['./mobile-room.component.scss']
})
export class MobileRoomComponent implements OnInit {
  roomId;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { 
  }

  ngOnInit(): void {
    this.roomId = Number(this.route.snapshot.paramMap.get("id"));
  }

}
