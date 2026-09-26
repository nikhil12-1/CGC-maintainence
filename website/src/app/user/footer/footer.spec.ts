import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Footer } from './footer';
import { configureComponentTest } from '../../testing/component-test-setup';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await configureComponentTest(Footer);

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
