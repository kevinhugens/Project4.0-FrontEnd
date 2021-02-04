import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticateService } from './security/services/authenticate.service';
import { User } from './shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project4-frontend';
  currentUser: User;

  constructor(private router: Router, private snackBar: MatSnackBar, private _authenticateService: AuthenticateService) {
    this._authenticateService.loggedUser.subscribe(
      result => {
        this.currentUser = result;
      }
    );
  }

  logout() {
    localStorage.clear();
    this.snackBar.open("Tot later " + this.currentUser.firstName + " " + this.currentUser.lastName + "!", "", { duration: 5000 });
    window.location.href = "/home"; //hard refresh
  }
}