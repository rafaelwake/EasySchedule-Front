import { TestBed } from '@angular/core/testing';

import { UpdateNotificationsService } from './update-notifications.service';

describe('UpdateNotificationsService', () => {
  let service: UpdateNotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateNotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
