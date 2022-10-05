import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateContainerComponent } from './real-estate-container.component';

describe('RealEstateContainerComponent', () => {
  let component: RealEstateContainerComponent;
  let fixture: ComponentFixture<RealEstateContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealEstateContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
