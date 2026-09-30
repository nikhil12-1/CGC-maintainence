import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-submit',
  standalone: false,
  styleUrl: './submit.css',
  templateUrl: './submit.html',
})
export class Submit {
  form = { subject: '', category: '', location: '', priority: '', description: '', contactPreference: 'email' };
  file: File | null = null; loading = false; error = ''; success = '';
  constructor(private api: ApiService, private router: Router, private cdr: ChangeDetectorRef) {}
  fileSelected(event: Event) { this.file = (event.target as HTMLInputElement).files?.[0] || null; }
  submit() {
    this.error = ''; this.success = ''; this.loading = true;
    const data = new FormData(); Object.entries(this.form).forEach(([key, value]) => data.append(key, value));
    if (this.file) data.append('attachments', this.file);
    this.api.submitComplaint(data).subscribe({ next: (result) => { this.loading = false; this.success = `Complaint submitted. Reference: ${result.data.complaintId}`; this.cdr.markForCheck(); setTimeout(() => this.router.navigate(['/complaint']), 1200); }, error: (e) => { this.loading = false; this.error = e.error?.message || 'Unable to submit the complaint.'; this.cdr.markForCheck(); } });
  }
}
