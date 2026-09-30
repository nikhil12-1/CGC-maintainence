import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, Complaint } from '../../services/api';

@Component({
  selector: 'app-track',
  standalone: false,
  styleUrl: './track.css',
  templateUrl: './track.html',
})
export class Track {
  id = ''; item?: Complaint; loading = false; error = '';
  constructor(private api: ApiService, route: ActivatedRoute, private cdr: ChangeDetectorRef) { this.id = route.snapshot.queryParamMap.get('id') || ''; if (this.id) this.load(); }
  load() { if (!this.id.trim()) { this.error = 'Enter a complaint reference to track.'; return; } this.loading = true; this.error = ''; this.api.complaint(this.id.trim()).subscribe({ next: (r) => { this.item = r.data; this.loading = false; this.cdr.markForCheck(); }, error: (e) => { this.item = undefined; this.error = e.error?.message || 'Could not find this complaint.'; this.loading = false; this.cdr.markForCheck(); } }); }
  download(filePath: string) { if (!this.item) return; this.api.attachment(this.item.complaintId, filePath).subscribe({ next: (blob) => { const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = filePath.split('/').pop() || 'attachment'; anchor.click(); URL.revokeObjectURL(url); }, error: () => { this.error = 'Unable to download this attachment.'; this.cdr.markForCheck(); } }); }
}
