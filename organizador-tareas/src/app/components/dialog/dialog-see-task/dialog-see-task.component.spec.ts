import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSeeTaskComponent } from './dialog-see-task.component';

describe('DialogSeeTaskComponent', () => {
  let component: DialogSeeTaskComponent;
  let fixture: ComponentFixture<DialogSeeTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSeeTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSeeTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
