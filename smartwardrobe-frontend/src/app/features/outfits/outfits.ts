import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Outfit, OutfitModel } from '../../core/services/outfit';
import { Navbar } from '../../shared/components/navbar/navbar';
import { DatePipe } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-outfits',
  imports: [RouterLink, Navbar, DatePipe],
  templateUrl: './outfits.html',
  styleUrl: './outfits.scss',
})
export class Outfits implements OnInit {
  apiUrl = environment.apiUrl;
  private outfitService = inject(Outfit);
  private cdr = inject(ChangeDetectorRef);

  outfits: OutfitModel[] = [];
  isLoading: boolean = false;
  isGenerating: boolean = false;
  errorMessage: string = '';

  ngOnInit(): void {
    this.loadOutfits();
  }

  loadOutfits(): void {
    this.isLoading = true;

    this.outfitService.getOutfits().subscribe({
      next: (data) => {
        this.outfits = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Ошибка загрузки аутфитов';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onGenerate(): void {
    this.isGenerating = true;
    this.errorMessage = '';

    this.outfitService.generateOutfit().subscribe({
      next: (outfit) => {
        this.outfits = [outfit, ...this.outfits];
        this.isGenerating = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.status === 400
          ? 'Все возможные аутфиты уже сгенерированы!'
          : 'Ошибка при генерации аутфита';
        this.isGenerating = false;
        this.cdr.detectChanges();
      }
    });
  }

  onDelete(id: number): void {
    const confirmed = confirm('Удалить этот аутфит?');
    if (!confirmed) return;

    this.outfitService.deleteOutfit(id).subscribe({
      next: () => {
        this.outfits = this.outfits.filter(o => o.id !== id);
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Ошибка при удалении аутфита';
        this.cdr.detectChanges();
      }
    });
  }
}