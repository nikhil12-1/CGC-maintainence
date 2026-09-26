import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Track } from './track';
import { configureComponentTest } from '../../testing/component-test-setup';

describe('Track', () => {
  let component: Track;
  let fixture: ComponentFixture<Track>;

  beforeEach(async () => {
    await configureComponentTest(Track);

    fixture = TestBed.createComponent(Track);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
