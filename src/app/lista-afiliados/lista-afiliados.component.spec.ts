import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAfiliadosComponent } from './lista-afiliados.component';

describe('ListaAfiliadosComponent', () => {
  let component: ListaAfiliadosComponent;
  let fixture: ComponentFixture<ListaAfiliadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAfiliadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAfiliadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
