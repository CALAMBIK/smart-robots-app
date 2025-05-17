// robots.component.ts
import {
  AfterViewInit,
  Component,
  effect,
  inject,
  Signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { RobotsStore } from '../../stores/robot.store';
import { Robots } from '../../entities/robots';
import { RobotFormDialog } from './robot-form-dialog/robot-form-dialog.component';

@Component({
  selector: 'app-robots',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatChipsModule,
  ],
  templateUrl: './robots.component.html',
  styleUrls: ['./robots.component.scss'],
})
export class RobotsComponent {
  private readonly robotsStore = inject(RobotsStore);
  private readonly dialog = inject(MatDialog);

  public robots: Signal<Robots[]> = this.robotsStore.robots;
  displayedColumns: string[] = ['name', 'type', 'status', 'actions'];
  dataSource = new MatTableDataSource<Robots>(this.robots());

  constructor() {
    effect(() => {
      this.dataSource = new MatTableDataSource<Robots>(this.robots());
    });
  }

  editRobot(robot: Robots) {
    const dialogRef = this.dialog.open(RobotFormDialog, {
      data: { name: robot.name, type: robot.type, status: robot.status },
    });

    dialogRef.afterClosed().subscribe((result: Robots) => {
      if (result !== undefined) {
        this.robotsStore.editRobot(result);
      }
    });
  }

  deleteRobot(robot: Robots) {
    this.robotsStore.deleteRobot(robot.id);
  }

  addRobot() {
    const dialogRef = this.dialog.open(RobotFormDialog, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: Robots) => {
      if (result !== undefined) {
        this.robotsStore.addRobot(result);
      }
    });
  }
}
