import { Component, DestroyRef, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,  MatDialogRef } from '@angular/material/dialog';
import { PeriodicElement } from '../../model/model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common'; 
import { CommaToDotDirective } from '../directives/comma-to-dot.directive';
import { digitsAndDotValidator } from '../validators/validator';

@Component({
  selector: 'app-dialog-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, NgIf, CommaToDotDirective, MatFormField],
  templateUrl: './dialog-form.component.html',
  styleUrl: './dialog-form.component.scss',
})
export class DialogFormComponent {
  protected destroyRef = inject(DestroyRef)
  constructor(public formBuilder: FormBuilder, 
    public dialogRef: MatDialogRef<DialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public elementToChange: { elementToChange: PeriodicElement }
  ) {
    this.formBuilderGroup.patchValue(this.elementToChange.elementToChange);
  }

  formBuilderGroup: FormGroup = this.formBuilder.group({
    position: this.formBuilder.control({ value: 0, disabled: true }, [Validators.required]),
    name: this.formBuilder.control('', [Validators.required]),
    weight: this.formBuilder.control(0, [Validators.required, digitsAndDotValidator()]),
    symbol: this.formBuilder.control('', [Validators.required])
  });

  cancel(): void {
    this.dialogRef.close('cancel');
  }

  save(): void {
  
    if (this.formBuilderGroup.invalid) return;
    if (this.formBuilderGroup.dirty || this.formBuilderGroup.valid) {
      this.dialogRef.close(this.formBuilderGroup.getRawValue());
    }
  }
}
