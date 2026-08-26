import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RnvFooterComponent } from './rnv-footer.component';

describe('RnvFooterComponent', () => {
  let component: RnvFooterComponent;
  let fixture: ComponentFixture<RnvFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RnvFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RnvFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
