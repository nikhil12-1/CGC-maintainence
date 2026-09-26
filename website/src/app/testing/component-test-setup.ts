import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { ApiService } from '../services/api';

const apiMock = {
  me: () => of({ data: { user: { id: 'student-1', name: 'Test Student', email: 'student@example.test', studentId: 'S-1', department: 'cse', year: 1, semester: 1 } } }),
  dashboard: () => of({ data: { total: 0, pending: 0, inProgress: 0, resolved: 0, resolutionRate: 0, recent: [] } }),
  complaints: () => of({ data: { items: [], total: 0, page: 1, pages: 0 } }),
  login: () => of({ user: {}, message: 'ok' }),
  register: () => of({ message: 'ok' }),
  submitComplaint: () => of({ data: {}, message: 'ok' }),
  complaint: () => of({ data: {} }),
  attachment: () => of(new Blob()),
  updateProfile: () => of({ data: { user: {} } }),
  changePassword: () => of({}),
  logout: () => of({})
};

export function configureComponentTest(component: Type<unknown>) {
  return TestBed.configureTestingModule({
    declarations: [component],
    imports: [CommonModule, FormsModule, RouterModule.forRoot([])],
    providers: [{ provide: ApiService, useValue: apiMock }]
  }).compileComponents();
}
