import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { Navbar } from '../../shared/components/navbar/navbar';

export interface User {
  id: number;
  username: string;
  email: string;
}

@Component({
  selector: 'app-profile',
  imports: [Navbar],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {

  private authService = inject(Auth);
  private cdr = inject(ChangeDetectorRef);

  user: User | null = null;
  isLoading: boolean = false;
  errorMessage: string = '';

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.isLoading = true;

    this.authService.getMe().subscribe({
      next: (data) => {
        this.user = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Ошибка загрузки профиля';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}