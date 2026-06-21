import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { WardrobeService, WardrobeItem } from '../../core/services/wardrobe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wardrobe',
  imports: [RouterLink],
  templateUrl: './wardrobe.html',
  styleUrl: './wardrobe.scss',
})
export class Wardrobe implements OnInit {

  private wardrobeService = inject(WardrobeService);
  private cdr = inject(ChangeDetectorRef);

  items: WardrobeItem[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.isLoading = true;

    this.wardrobeService.getItems().subscribe({
      next: (data) => {
        this.items = data;
        this.isLoading = false;
        this.cdr.detectChanges();  // ← говорим Angular перерисовать
      },
      error: () => {
        this.errorMessage = 'Ошибка загрузки гардероба';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}