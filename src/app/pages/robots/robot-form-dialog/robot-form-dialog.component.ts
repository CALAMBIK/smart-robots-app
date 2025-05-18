import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Robots } from '../../../entities/robots';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-robot-form-dialog',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './robot-form-dialog.component.html',
  styleUrl: './robot-form-dialog.component.scss',
})
export class RobotFormDialog {
  readonly dialogRef = inject(MatDialogRef<RobotFormDialog>);
  readonly data = inject<Robots | undefined>(MAT_DIALOG_DATA);

  public formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
  });

  constructor() {
    if (this.data) {
      this.formGroup.patchValue({
        name: this.data.name ?? '',
        type: this.data.type ?? '',
        status: this.data.status ?? 'active',
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCreateOrEdit() {
    this.dialogRef.close({
      id: this.data ? this.data.id : new Date().valueOf(),
      ...this.formGroup.value,
    });
  }
}
