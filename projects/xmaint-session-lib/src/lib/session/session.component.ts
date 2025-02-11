import { Component, ChangeDetectionStrategy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'xmaint-core-lib'; // Adjust the path based on your project structure
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginCredentials } from 'xmaint-shared-lib';
import { MatOption } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

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
    MatDialogModule,
    MatCheckboxModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
})
export class SessionComponent implements OnInit {
  id: string = '';
  password: string = '';
  type: string = 'login';

  @ViewChild('privacyDialog') privacyDialog!: TemplateRef<any>;

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) {}

  openPrivacyDialog(event: Event) {
    event.preventDefault(); // Prevent checkbox from being toggled immediately

    const dialogRef = this.dialog.open(this.privacyDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Dialog closed');
      // You can add logic here if you want to handle checkbox state
    });
  }
  closeDialog() {
    this.dialog.closeAll();
  }

  acceptAndCloseDialog(checkbox: any) {
    // Check the checkbox
    checkbox.checked = true;

    // Close the dialog
    this.dialog.closeAll();
  }

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

