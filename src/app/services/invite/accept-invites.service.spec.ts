import { TestBed } from '@angular/core/testing';

import { AcceptInvitesService } from './accept-invites.service';

describe('AcceptInvitesService', () => {
  let service: AcceptInvitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcceptInvitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
