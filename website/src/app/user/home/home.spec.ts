import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';
import { configureComponentTest } from '../../testing/component-test-setup';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await configureComponentTest(Home);

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
