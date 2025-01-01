import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuotesListComponent } from './quotes-list.component';

describe('QuotesListComponent', () => {
  let component: QuotesListComponent;
  let fixture: ComponentFixture<QuotesListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [QuotesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuotesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
