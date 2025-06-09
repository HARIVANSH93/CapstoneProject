import { Injectable, signal } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' }) 
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private baseUrl = 'http://localhost:5021/api/Auth';

  isLoggedIn = signal<boolean>(!!this.getToken());

  login(data: { email: string; password: string }) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  register(data: { fullName: string; email: string; password: string; role: string }) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  storeToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      this.isLoggedIn.set(true);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      this.isLoggedIn.set(false);
      this.router.navigate(['/']);
    }
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload['role'] || null;
    } catch {
      return null;
    }
  }

 getUserFromToken(): any {
  const token = this.getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
      fullName: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      email: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
      role: payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    };
  } catch (err) {
    console.error('Invalid token structure:', err);
    return null;
  }
}

  getUserById(id: number) {
    return this.http.get(`http://localhost:5021/api/User/${id}`);
  }
}
