import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotFormDialogComponent } from './robot-form-dialog.component';

describe('RobotFormDialogComponent', () => {
  let component: RobotFormDialogComponent;
  let fixture: ComponentFixture<RobotFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RobotFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RobotFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
