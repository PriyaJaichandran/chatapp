import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedusersComponent } from './linkedusers.component';

describe('LinkedusersComponent', () => {
  let component: LinkedusersComponent;
  let fixture: ComponentFixture<LinkedusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkedusersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
