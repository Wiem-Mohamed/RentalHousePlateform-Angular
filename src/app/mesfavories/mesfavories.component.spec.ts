import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesfavoriesComponent } from './mesfavories.component';

describe('MesfavoriesComponent', () => {
  let component: MesfavoriesComponent;
  let fixture: ComponentFixture<MesfavoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MesfavoriesComponent]
    });
    fixture = TestBed.createComponent(MesfavoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
