import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogEtiquetaComponent } from './dialog-etiqueta.component';

describe('DialogEtiquetaComponent', () => {
  let component: DialogEtiquetaComponent;
  let fixture: ComponentFixture<DialogEtiquetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEtiquetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEtiquetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
