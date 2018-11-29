import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotatorLoginComponent } from './annotator-login.component';

describe('AnnotatorLoginComponent', () => {
  let component: AnnotatorLoginComponent;
  let fixture: ComponentFixture<AnnotatorLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotatorLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotatorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
