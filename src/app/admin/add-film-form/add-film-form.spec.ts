import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFilmForm } from './add-film-form';

describe('AddFilmForm', () => {
  let component: AddFilmForm;
  let fixture: ComponentFixture<AddFilmForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFilmForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFilmForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
