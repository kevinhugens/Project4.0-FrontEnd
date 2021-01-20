import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import {Room} from 'src/app/shared/models/room.model'
import {RoomService} from 'src/app/shared/services/room.service'

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
    private roomService: RoomService) { }

    ngOnInit(): void {
      this.model = new Room();
    }



  onSubmit () {
    this.roomService.addRoom(this.model)
    .subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl("/table");
      },
      error: error => {
        this.loading = false;
      }}
    )
  }

}
