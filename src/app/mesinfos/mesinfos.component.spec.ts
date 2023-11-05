import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesinfosComponent } from './mesinfos.component';

describe('MesinfosComponent', () => {
  let component: MesinfosComponent;
  let fixture: ComponentFixture<MesinfosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MesinfosComponent]
    });
    fixture = TestBed.createComponent(MesinfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
