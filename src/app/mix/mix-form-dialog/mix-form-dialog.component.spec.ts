import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixFormDialogComponent } from './mix-form-dialog.component';

describe('MixFormDialogComponent', () => {
  let component: MixFormDialogComponent;
  let fixture: ComponentFixture<MixFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MixFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MixFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
