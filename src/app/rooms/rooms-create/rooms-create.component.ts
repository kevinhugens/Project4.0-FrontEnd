import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import {Room} from 'src/app/shared/models/room.model'
import {RoomService} from 'src/app/shared/services/room.service'
import { AuthenticateService } from 'src/app/security/services/authenticate.service';

@Component({
  selector: 'app-rooms-create',
  templateUrl: './rooms-create.component.html',
  styleUrls: ['./rooms-create.component.scss']
})
export class RoomsCreateComponent implements OnInit {


  model;
  loading = false;
  submitted = false;


  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _roomService: RoomService,
    private _authenticateService: AuthenticateService) { }

    ngOnInit(): void {
      this.model = new Room();
      this._authenticateService.loggedUser.subscribe(
        result => {
          console.log(result.userID)
          this.model.PresentatorID = result.userID;
        }
      );
    }



  onSubmit () {
    this.submitted = true;
    //check some stuff
    this.loading = true;
    this._roomService.addRoom(this.model)
    .subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl("/rooms");
      },
      error: error => {
        this.loading = false;
      }}
    )
  }


}
