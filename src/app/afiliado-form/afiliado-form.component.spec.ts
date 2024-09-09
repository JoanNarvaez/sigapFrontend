import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiliadoFormComponent } from './afiliado-form.component';

describe('AfiliadoFormComponent', () => {
  let component: AfiliadoFormComponent;
  let fixture: ComponentFixture<AfiliadoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfiliadoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfiliadoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
