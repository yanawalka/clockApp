import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurrentAlarmComponent } from './recurrent-alarm.component';

describe('RecurrentAlarmComponent', () => {
  let component: RecurrentAlarmComponent;
  let fixture: ComponentFixture<RecurrentAlarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecurrentAlarmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurrentAlarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
