import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Mycmp } from './mycmp';
import { configureComponentTest } from '../../testing/component-test-setup';

describe('Mycmp', () => {
  let component: Mycmp;
  let fixture: ComponentFixture<Mycmp>;

  beforeEach(async () => {
    await configureComponentTest(Mycmp);

    fixture = TestBed.createComponent(Mycmp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
