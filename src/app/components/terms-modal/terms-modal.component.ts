import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-terms-modal',
  templateUrl: './terms-modal.component.html',
})
export class TermsModalComponent {
  constructor(public activeModal: NgbActiveModal) {}
}
