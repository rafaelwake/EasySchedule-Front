import { TestBed } from '@angular/core/testing';

import { UpdateAppointmentsService } from './update-appointments.service';

describe('UpdateAppointmentsService', () => {
  let service: UpdateAppointmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateAppointmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
