import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficheannonceComponent } from './afficheannonce.component';

describe('AfficheannonceComponent', () => {
  let component: AfficheannonceComponent;
  let fixture: ComponentFixture<AfficheannonceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AfficheannonceComponent]
    });
    fixture = TestBed.createComponent(AfficheannonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
