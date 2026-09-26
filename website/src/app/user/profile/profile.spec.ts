import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Profile } from './profile';
import { configureComponentTest } from '../../testing/component-test-setup';

describe('Profile', () => {
  let component: Profile;
  let fixture: ComponentFixture<Profile>;

  beforeEach(async () => {
    await configureComponentTest(Profile);

    fixture = TestBed.createComponent(Profile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
