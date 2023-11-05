import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceupComponent } from './annonceup.component';

describe('AnnonceupComponent', () => {
  let component: AnnonceupComponent;
  let fixture: ComponentFixture<AnnonceupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnonceupComponent]
    });
    fixture = TestBed.createComponent(AnnonceupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
