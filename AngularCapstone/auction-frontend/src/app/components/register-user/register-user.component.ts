import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent {
  fullName = '';
  email = '';
  password = '';
  message = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    const user = {
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      role: 'User'
    };

    this.auth.register(user).subscribe({
      next: () => {
        this.message = '✅ Registered Successfully!';
        setTimeout(() => this.router.navigate(['/user/login']), 1500);
      },
      error: (err) => {
        this.message = '❌ Registration failed.';
        console.error(err);
      }
    });
  }
}
