import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesannoncesComponent } from './mesannonces.component';

describe('MesannoncesComponent', () => {
  let component: MesannoncesComponent;
  let fixture: ComponentFixture<MesannoncesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MesannoncesComponent]
    });
    fixture = TestBed.createComponent(MesannoncesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
