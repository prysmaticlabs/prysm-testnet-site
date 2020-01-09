import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipateComponent } from './participate.component';

describe('ParticipateComponent', () => {
  let component: ParticipateComponent;
  let fixture: ComponentFixture<ParticipateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
