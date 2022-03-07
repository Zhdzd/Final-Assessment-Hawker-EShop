import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HawkerListComponent } from './hawker-list.component';

describe('HawkerListComponent', () => {
  let component: HawkerListComponent;
  let fixture: ComponentFixture<HawkerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HawkerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HawkerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
