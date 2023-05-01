import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">{{ title }}</h4>
      <button
        type="button"
        class="close"
        aria-label="Close"
        (click)="modal.close('dismiss')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body text-black">
      <p>{{ confirmationText }}</p>
    </div>
    <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
      <button
        type="button"
        class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
        (click)="modal.close('confirm')"
      >
        Confirmar
      </button>
      <button
        type="button"
        class="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
        (click)="modal.close('cancel')"
      >
        Cancelar
      </button>
    </div>
  `,
})
export class NgbdModalContent {
  title: string = 'Confirmação';
  confirmationText: string = '';
  constructor(public modal: NgbActiveModal) {}
}
