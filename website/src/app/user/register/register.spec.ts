import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Register } from './register';
import { configureComponentTest } from '../../testing/component-test-setup';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  beforeEach(async () => {
    await configureComponentTest(Register);

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
