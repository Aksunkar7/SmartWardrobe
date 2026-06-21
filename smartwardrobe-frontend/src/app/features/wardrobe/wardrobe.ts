import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WardrobeService, WardrobeItem } from '../../core/services/wardrobe';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-wardrobe',
  imports: [RouterLink, Navbar],
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
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Ошибка загрузки гардероба';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onDelete(id: number): void {
    const confirmed = confirm('Удалить эту вещь?');
    if (!confirmed) return;

    this.wardrobeService.deleteItem(id).subscribe({
      next: () => {
        this.items = this.items.filter(item => item.id !== id);
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Ошибка при удалении вещи';
        this.cdr.detectChanges();
      }
    });
  }
}