import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'core'; // Adjust the path based on your project structure
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginCredentials } from 'shared';

@Component({
  selector: 'lib-session',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
})
export class SessionComponent implements OnInit {
  id: string = '';
  password: string = '';
  type: string = 'login';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log(this.id, this.password, 'credentials');
  }

  onSubmit() {
    if (!this.id || !this.password) {
      alert('Please enter both ID and password');
      return;
    }

    // Create an object using the LoginCredentials model
    const credentials: LoginCredentials = {
      username: this.id,
      password: this.password,
      type: this.type,
    };

    // Pass the object to the login method
    this.authService.login(credentials).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']); // Navigate to the dashboard or any secure route
      },
      error: (err) => {
        alert('Invalid credentials. Please try again.');
      },
    });

    console.log('submitted!!!');
  }
}

