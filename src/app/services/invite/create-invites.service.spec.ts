import { TestBed } from '@angular/core/testing';

import { CreateInvitesService } from './create-invites.service';

describe('CreateInvitesService', () => {
  let service: CreateInvitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateInvitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
