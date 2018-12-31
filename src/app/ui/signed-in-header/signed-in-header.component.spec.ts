import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedInHeaderComponent } from './signed-in-header.component';

describe('SignedInHeaderComponent', () => {
  let component: SignedInHeaderComponent;
  let fixture: ComponentFixture<SignedInHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignedInHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignedInHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
