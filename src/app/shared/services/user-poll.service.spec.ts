import { TestBed } from '@angular/core/testing';

import { UserPollService } from './user-poll.service';

describe('UserPollService', () => {
  let service: UserPollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
