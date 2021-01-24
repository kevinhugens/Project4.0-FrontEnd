import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileRoomComponent } from './mobile-room.component';

describe('MobileRoomComponent', () => {
  let component: MobileRoomComponent;
  let fixture: ComponentFixture<MobileRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
