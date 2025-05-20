import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IoTDevice } from '../../../entities/devices';

@Component({
  selector: 'app-devices-form-dialog',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './devices-form-dialog.component.html',
  styleUrl: './devices-form-dialog.component.scss',
})
export class DevicesFormDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DevicesFormDialogComponent>);
  readonly data = inject<IoTDevice | undefined>(MAT_DIALOG_DATA);

  public formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    ipAddress: new FormControl('', Validators.required),
    firmwareVersion: new FormControl('', Validators.required),
  });

  constructor() {
    if (this.data) {
      this.formGroup.patchValue({
        name: this.data.name ?? '',
        type: this.data.type ?? '',
        status: this.data.status ?? 'online',
        ipAddress: this.data.ipAddress ?? '',
        firmwareVersion: this.data.firmwareVersion ?? '',
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
