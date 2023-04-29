import { TestBed } from '@angular/core/testing';

import { CreateAppointmentsService } from './create-appointments.service';

describe('CreateAppointmentsService', () => {
  let service: CreateAppointmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateAppointmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
