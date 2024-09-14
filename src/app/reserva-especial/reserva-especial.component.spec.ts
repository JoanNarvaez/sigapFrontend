import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaEspecialComponent } from './reserva-especial.component';

describe('ReservaEspecialComponent', () => {
  let component: ReservaEspecialComponent;
  let fixture: ComponentFixture<ReservaEspecialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaEspecialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaEspecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
