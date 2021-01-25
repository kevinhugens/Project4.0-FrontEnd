import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../shared/services/user.service'
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/security/services/authenticate.service';

@Component({
  selector: 'app-mobile-home',
  templateUrl: './mobile-home.component.html',
  styleUrls: ['./mobile-home.component.scss']
})
export class MobileHomeComponent implements OnInit {
  @ViewChild('scanner',{static: true})
  scanner: ZXingScannerComponent;

    hasDevices = false;
    hasPermission: boolean;

    availableDevices: MediaDeviceInfo[];
    currentDevice: MediaDeviceInfo = null;

  constructor(private _userService: UserService, private _authenticateService: AuthenticateService ,private router: Router) { }

  ngOnInit(): void {
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasDevices = true;
      this.availableDevices = devices;
      this.currentDevice = null;
      if (this.availableDevices.length > 1) {
        const defaultCamera = this.availableDevices.filter(e => e.label.toLocaleLowerCase().indexOf('achter') > -1);
        if (defaultCamera !== null && defaultCamera !== undefined) {
          this.currentDevice = defaultCamera[0];
        } else {
           this.currentDevice = this.availableDevices[0];
        }
      } else {
        this.currentDevice = this.availableDevices[0];
      }
    });

    this.scanner.camerasNotFound.subscribe((devices: MediaDeviceInfo[]) => {
        console.error('An error has occurred when trying to enumerate your video-stream-enabled devices.');
    });

    this.scanner.permissionResponse.subscribe((answer: boolean) => {
      this.hasPermission = answer;
    });
  }
  
  handleQrCodeResult(resultString: String) {
   var array = resultString.split(',');
   var roomID = array[0];
   var token = array[1];
   this._userService.getUserByToken(token).subscribe((data) => {
      this._authenticateService.logUser(data);
      this.router.navigate(["mobile/room/"+roomID]);
   });
  }
}
