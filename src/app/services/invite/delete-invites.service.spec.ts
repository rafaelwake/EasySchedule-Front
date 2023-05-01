import { TestBed } from '@angular/core/testing';

import { DeleteInvitesService } from './delete-invites.service';

describe('DeleteInvitesService', () => {
  let service: DeleteInvitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteInvitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
