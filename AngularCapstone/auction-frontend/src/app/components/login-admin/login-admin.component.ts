import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.auth.login(credentials).subscribe({
      next: (res: any) => {
        if (res.role.toLowerCase() === 'admin') {
          this.auth.storeToken(res.token);
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.error = '❌ You are not authorized as admin';
        }
      },
      error: () => {
        this.error = '❌ Invalid email or password';
      }
    });
  }
}
