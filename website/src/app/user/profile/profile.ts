import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, Student } from '../../services/api';

@Component({
  selector: 'app-profile',
  standalone: false,
  styleUrl: './profile.css',
  templateUrl: './profile.html',
})
export class Profile {
  user?: Student; loading = true; error = ''; edit = false; saving = false;
  passwordOpen = false; currentPassword = ''; newPassword = ''; passwordMessage = ''; passwordSaving = false;
  constructor(private api: ApiService, private router: Router, private cdr: ChangeDetectorRef) { this.load(); }
  load() { this.api.me().subscribe({ next: (r) => { this.user = r.data.user; this.loading = false; this.cdr.markForCheck(); }, error: (e) => { this.error = e.error?.message || 'Could not load profile.'; this.loading = false; this.cdr.markForCheck(); } }); }
  save() { if (!this.user) return; this.saving = true; this.api.updateProfile({ name: this.user.name, phone: this.user.phone, department: this.user.department, year: this.user.year, semester: this.user.semester }).subscribe({ next: (r) => { this.user = r.data.user; this.edit = false; this.saving = false; this.cdr.markForCheck(); }, error: (e) => { this.error = e.error?.message || 'Could not save profile.'; this.saving = false; this.cdr.markForCheck(); } }); }
  logout() { this.api.logout().subscribe({ complete: () => this.router.navigate(['/login']), error: () => this.router.navigate(['/login']) }); }
  changePassword() { this.passwordSaving = true; this.passwordMessage = ''; this.api.changePassword({ currentPassword: this.currentPassword, newPassword: this.newPassword }).subscribe({ next: () => { this.passwordMessage = 'Password updated.'; this.currentPassword = ''; this.newPassword = ''; this.passwordSaving = false; this.cdr.markForCheck(); }, error: (e) => { this.passwordMessage = e.error?.message || 'Could not update password.'; this.passwordSaving = false; this.cdr.markForCheck(); } }); }
}
