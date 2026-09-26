import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';
@Component({
  selector: 'app-register',
  standalone: false,
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  firstName = ''; lastName = ''; studentId = ''; email = ''; department = ''; semester = ''; password = ''; confirmPassword = ''; loading = false; error = ''; success = '';
  constructor(private api: ApiService, private router: Router) {}
  submit() {
    this.error = ''; this.success = '';
    if (this.password !== this.confirmPassword) { this.error = 'Passwords do not match.'; return; }
    this.loading = true;
    this.api.register({ name: `${this.firstName.trim()} ${this.lastName.trim()}`, studentId: this.studentId, email: this.email, department: this.department, semester: Number(this.semester), password: this.password }).subscribe({ next: () => { this.loading = false; this.success = 'Account created. You can now sign in.'; setTimeout(() => this.router.navigate(['/login']), 900); }, error: (e) => { this.loading = false; this.error = e.error?.message || 'Unable to create account. Please try again.'; } });
  }
}
