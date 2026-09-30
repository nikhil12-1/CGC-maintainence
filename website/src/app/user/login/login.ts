import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-login',
  standalone: false,
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  email = ''; password = ''; loading = false; error = '';
  constructor(private api: ApiService, private router: Router, private cdr: ChangeDetectorRef) {}
  submit() { this.loading = true; this.error = ''; this.api.login(this.email, this.password).subscribe({ next: () => { this.loading = false; this.cdr.markForCheck(); this.router.navigate(['/home']); }, error: (e) => { this.error = e.error?.message || 'Unable to sign in. Please try again.'; this.loading = false; this.cdr.markForCheck(); } }); }
}
