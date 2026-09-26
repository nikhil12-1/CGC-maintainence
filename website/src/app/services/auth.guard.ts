import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from './api';
import { catchError, map, of } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private router = inject(Router);
  private api = inject(ApiService);
  canActivate() { return this.api.me().pipe(map(() => true), catchError(() => { this.router.navigate(['/login']); return of(false); })); }
}
