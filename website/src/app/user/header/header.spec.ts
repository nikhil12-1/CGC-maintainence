import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';
import { configureComponentTest } from '../../testing/component-test-setup';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await configureComponentTest(Header);

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
