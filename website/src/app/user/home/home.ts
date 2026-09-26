import { Component } from '@angular/core';
import { ApiService, Dashboard } from '../../services/api';

@Component({
  selector: 'app-home',
  standalone: false,
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  data?: Dashboard; loading = true; error = '';
  constructor(private api: ApiService) { this.api.me().subscribe({ next: () => this.load(), error: () => this.loading = false }); }
  load() { this.loading = true; this.api.dashboard().subscribe({ next: (r) => { this.data = r.data; this.loading = false; }, error: (e) => { this.error = e.error?.message || 'Could not load complaint summary.'; this.loading = false; } }); }
}
