import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationInfoPageComponent } from './application-info-page.component';

describe('ApplicationInfoPageComponent', () => {
  let component: ApplicationInfoPageComponent;
  let fixture: ComponentFixture<ApplicationInfoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationInfoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
