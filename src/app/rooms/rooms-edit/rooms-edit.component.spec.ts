import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsEditComponent } from './rooms-edit.component';

describe('RoomsEditComponent', () => {
  let component: RoomsEditComponent;
  let fixture: ComponentFixture<RoomsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
