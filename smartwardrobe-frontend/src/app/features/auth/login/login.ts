import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  router = inject(Router);

  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate(['/wardrobe']);
      },
      error: () => {
        this.errorMessage = 'invalid login or password';
        this.isLoading = false;
      }
    });
  }
}