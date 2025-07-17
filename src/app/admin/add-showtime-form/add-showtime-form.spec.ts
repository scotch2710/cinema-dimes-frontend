import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShowtimeForm } from './add-showtime-form';

describe('AddShowtimeForm', () => {
  let component: AddShowtimeForm;
  let fixture: ComponentFixture<AddShowtimeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddShowtimeForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddShowtimeForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
