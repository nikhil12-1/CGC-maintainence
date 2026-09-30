import { ChangeDetectorRef, Component } from '@angular/core';
import { ApiService, Dashboard } from '../../services/api';

@Component({
  selector: 'app-home',
  standalone: false,
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  data?: Dashboard; loading = true; error = '';
  constructor(private api: ApiService, private cdr: ChangeDetectorRef) { this.api.me().subscribe({ next: () => this.load(), error: () => { this.loading = false; this.cdr.markForCheck(); } }); }
  load() { this.loading = true; this.api.dashboard().subscribe({ next: (r) => { this.data = r.data; this.loading = false; this.cdr.markForCheck(); }, error: (e) => { this.error = e.error?.message || 'Could not load complaint summary.'; this.loading = false; this.cdr.markForCheck(); } }); }
}
