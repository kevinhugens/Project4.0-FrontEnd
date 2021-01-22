import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../shared/services/user.service'
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

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

  constructor(private _userService: UserService) { }

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
    //this._userService.getUserByToken(resultString).subscribe((data) => {
      //console.log(data);
   // });
   alert(resultString);
  }
}
