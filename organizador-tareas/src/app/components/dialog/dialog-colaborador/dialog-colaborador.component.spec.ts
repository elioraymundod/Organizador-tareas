import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogColaboradorComponent } from './dialog-colaborador.component';

describe('DialogColaboradorComponent', () => {
  let component: DialogColaboradorComponent;
  let fixture: ComponentFixture<DialogColaboradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogColaboradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
