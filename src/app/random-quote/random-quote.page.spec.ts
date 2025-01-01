import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RandomQuotePage } from './random-quote.page';

describe('RandomQuotePage', () => {
  let component: RandomQuotePage;
  let fixture: ComponentFixture<RandomQuotePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomQuotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
