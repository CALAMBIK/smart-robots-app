import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesFormDialogComponent } from './devices-form-dialog.component';

describe('DevicesFormDialogComponent', () => {
  let component: DevicesFormDialogComponent;
  let fixture: ComponentFixture<DevicesFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevicesFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevicesFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
