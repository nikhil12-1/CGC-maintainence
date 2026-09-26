import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Student { id: string; name: string; email: string; studentId: string; phone?: string; department: string; year: number; semester: number; }
export interface Complaint { _id: string; complaintId: string; category: string; subject: string; description: string; location: string; priority: string; status: string; attachments: { filename: string; path: string }[]; resolution?: string; feedback?: { rating: number; comment: string } | null; createdAt: string; updatedAt: string; }
export interface ComplaintPage { items: Complaint[]; total: number; page: number; pages: number; }
export interface Dashboard { total: number; pending: number; inProgress: number; resolved: number; resolutionRate: number; recent: Complaint[]; }

const API = 'http://localhost:5000/api';
@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  login(email: string, password: string) { return this.http.post<{ user: Student; message: string }>(`${API}/auth/login`, { email, password }); }
  register(body: object) { return this.http.post<{ message: string }>(`${API}/auth/register`, body); }
  me() { return this.http.get<{ data: { user: Student } }>(`${API}/auth/me`); }
  updateProfile(body: object) { return this.http.patch<{ data: { user: Student } }>(`${API}/auth/me`, body); }
  changePassword(body: object) { return this.http.patch(`${API}/auth/password`, body); }
  logout() { return this.http.post(`${API}/auth/logout`, {}); }
  dashboard() { return this.http.get<{ data: Dashboard }>(`${API}/dashboard`); }
  complaints(params: Record<string, string> = {}) { let httpParams = new HttpParams(); Object.entries(params).forEach(([k, v]) => httpParams = httpParams.set(k, v)); return this.http.get<{ data: ComplaintPage }>(`${API}/complaints/mycmp`, { params: httpParams }); }
  complaint(id: string) { return this.http.get<{ data: Complaint }>(`${API}/complaints/track/${encodeURIComponent(id)}`); }
  attachment(id: string, filePath: string) { const file = filePath.split('/').pop() || ''; return this.http.get(`${API}/complaints/track/${encodeURIComponent(id)}/attachments/${encodeURIComponent(file)}`, { responseType: 'blob' }); }
  submitComplaint(body: FormData) { return this.http.post<{ data: Complaint; message: string }>(`${API}/complaints`, body); }
}
