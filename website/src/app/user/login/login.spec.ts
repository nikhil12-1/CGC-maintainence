import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { configureComponentTest } from '../../testing/component-test-setup';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await configureComponentTest(Login);

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
