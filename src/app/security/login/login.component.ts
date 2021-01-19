import { Component, OnInit } from '@angular/core';
import { UserLogin } from 'src/app/shared/models/user-login.model';
import { AuthenticateService } from '../services/authenticate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userLogin = new UserLogin('', '');
  
  constructor(private _authenticateService: AuthenticateService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  onSubmit(){
    //console.log("User wants to login:", this.userLogin);
    this._authenticateService.authenticate(this.userLogin).subscribe(
      result => {
        //console.log("Result:", result);
        //console.log("Token is:", result.token);
        if (result.token) {
          // Save in localStorage before setting the user as logged in!
          localStorage.setItem("token", result.token);
          localStorage.setItem("currentUser",JSON.stringify(result));
          this._authenticateService.logUser(result);
          this.router.navigate(['']); 
          this.snackBar.open("Welkom " + result.firstName + " " + result.lastName + "!", "", { duration: 5000 });
        }else{
          this.snackBar.open("Aanmelden niet gelukt!", "", { duration: 5000 });
        }
      },
      error => {
        this.snackBar.open("Aanmelden niet gelukt!", "", { duration: 5000 });
      }

    )
  }
}
