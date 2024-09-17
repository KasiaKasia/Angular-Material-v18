import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirmation',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './dialog-confirmation.component.html',
  styleUrl: './dialog-confirmation.component.scss'
})
export class DialogConfirmationComponent {
  constructor(public dialogRef: MatDialogRef<DialogConfirmationComponent>) {}

  confirmSaving(): void {
    this.dialogRef.close('confirmSaving');
  }

  confirmCancel(): void {
    this.dialogRef.close('confirmCancel');
  }
}
