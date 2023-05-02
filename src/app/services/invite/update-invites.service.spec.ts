import { TestBed } from '@angular/core/testing';

import { UpdateInvitesService } from './update-invites.service';

describe('UpdateInvitesService', () => {
  let service: UpdateInvitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateInvitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
