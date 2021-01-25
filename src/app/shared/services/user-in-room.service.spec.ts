import { TestBed } from '@angular/core/testing';

import { UserInRoomService } from './user-in-room.service';

describe('UserInRoomService', () => {
  let service: UserInRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
