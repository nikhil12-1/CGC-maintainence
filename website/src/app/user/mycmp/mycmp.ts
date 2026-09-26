import { Component } from '@angular/core';
import { ApiService, Complaint, Dashboard } from '../../services/api';

@Component({
  selector: 'app-mycmp',
  standalone: false,
  styleUrl: './mycmp.css',
  templateUrl: './mycmp.html',
})
export class Mycmp {
  items: Complaint[] = []; stats?: Dashboard; loading = true; error = ''; search = ''; status = ''; page = 1; pages = 1; total = 0;
  constructor(private api: ApiService) { this.load(); }
  load() {
    this.loading = true;
    this.api.complaints({ search: this.search, status: this.status, page: String(this.page), limit: '5' }).subscribe({ next: (r) => { this.items = r.data.items; this.total = r.data.total; this.pages = Math.max(1, r.data.pages); this.loading = false; }, error: (e) => { this.error = e.error?.message || 'Could not load complaints.'; this.loading = false; } });
    this.api.dashboard().subscribe({ next: (r) => this.stats = r.data });
  }
  changePage(page: number) { if (page < 1 || page > this.pages || page === this.page) return; this.page = page; this.load(); }
  get pageNumbers() { return Array.from({ length: this.pages }, (_value, index) => index + 1); }
  statusClass(status: string) { return status === 'In Progress' ? 'progress-status' : ['Submitted', 'Under Review'].includes(status) ? 'pending-status' : status === 'Resolved' || status === 'Closed' ? 'resolved-status' : 'rejected-status'; }
  categoryClass(category: string) { return category.toLowerCase().replace(/[^a-z0-9]+/g, '-'); }
}
