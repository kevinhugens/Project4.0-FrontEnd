import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-rooms-create',
  templateUrl: './rooms-create.component.html',
  styleUrls: ['./rooms-create.component.scss']
})
export class RoomsCreateComponent implements OnInit {


  form: FormGroup;
  loading = false;
  submitted = false;


  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,) { }

    ngOnInit(): void {
      this.form = this.formBuilder.group({
        name: ['', Validators.required],
        moderator: ['', Validators.required],
        password: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required]
      });
    }

  get f () { return this.form.controls; }

  onSubmit () {
    this.submitted = true;
  }

}
