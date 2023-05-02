import { TestBed } from '@angular/core/testing';

import { UnsubscribeInvitesService } from './unsubscribe-invites.service';

describe('UnsubscribeInvitesService', () => {
  let service: UnsubscribeInvitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnsubscribeInvitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
