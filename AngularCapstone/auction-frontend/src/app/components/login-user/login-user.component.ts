import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent {
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
        this.auth.storeToken(res.token);
        this.router.navigate(['/user/dashboard']);
      },
      error: () => {
        this.error = '❌ Invalid email or password';
      }
    });
  }
}
