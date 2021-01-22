import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../shared/services/user.service'
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result } from '@zxing/library';

@Component({
  selector: 'app-mobile-home',
  templateUrl: './mobile-home.component.html',
  styleUrls: ['./mobile-home.component.scss']
})
export class MobileHomeComponent implements OnInit {
  @ViewChild('scanner',{static:true, read: false})
  scanner: ZXingScannerComponent;

  hasDevices: boolean;
  hasPermission: boolean;
  qrResultString: string;
  qrResult: Result;

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this.onPageInit();
  }
  

  onCodeResult(resultString: String) {
    //this._userService.getUserByToken(resultString).subscribe((data) => {
      //console.log(data);
   // });
   alert(resultString);
  }

  private onPageInit(){
    this.initCamera();
    console.log(this.scanner);
    this.scanner.permissionResponse.subscribe(
      (perm: boolean) =>{
       this.hasPermission = perm;
      });
    console.log('inside the init camera');
  }

  private initCamera(): void {
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasDevices = true;
      this.availableDevices = devices;
      this.currentDevice = null;
      if (this.availableDevices.length > 1) {
        const defaultCamera = this.availableDevices.filter(e => e.label.toLocaleLowerCase().indexOf('back') > -1);
        if (defaultCamera !== null && defaultCamera !== undefined) {
          this.currentDevice = defaultCamera[0];
        } else {
           this.currentDevice = this.availableDevices[0];
        }
      } else {
        this.currentDevice = this.availableDevices[0];
      }
    });
  }
}
