import { DevicesFormDialogComponent } from './devices-form-dialog/devices-form-dialog.component';
import { CommonModule } from '@angular/common';
import { DevicesStore } from './../../stores/device.store';
import { Component, effect, inject, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IoTDevice } from '../../entities/devices';

@Component({
  selector: 'app-devices',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.scss',
})
export class DevicesComponent {
  private readonly deviceStore = inject(DevicesStore);
  private readonly dialog = inject(MatDialog);
  public devices: Signal<IoTDevice[]> = this.deviceStore.devices;

  displayedColumns: string[] = [
    'name',
    'type',
    'status',
    'ipAddress',
    'firmwareVersion',
    'actions',
  ];

  dataSource = new MatTableDataSource<IoTDevice>(this.devices());

  constructor() {
    effect(() => {
      this.dataSource = new MatTableDataSource<IoTDevice>(this.devices());
    });
  }

  editDevice(device: IoTDevice) {
    const dialogRef = this.dialog.open(DevicesFormDialogComponent, {
      data: {
        ...device,
      },
    });

    dialogRef.afterClosed().subscribe((result: IoTDevice) => {
      if (result !== undefined) {
        this.deviceStore.editDevice(result);
      }
    });
  }

  deleteDevice(device: IoTDevice) {
    this.deviceStore.deleteDevice(device.id);
  }

  addDevice() {
    const dialogRef = this.dialog.open(DevicesFormDialogComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: IoTDevice) => {
      if (result !== undefined) {
        this.deviceStore.addDevice(result);
      }
    });
  }
}
