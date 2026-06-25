import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Outfit, OutfitModel } from '../../core/services/outfit';
import { Navbar } from '../../shared/components/navbar/navbar';
import { environment } from '../../../environments/environment';
import { marked } from 'marked';

@Component({
  selector: 'app-outfits',
  imports: [Navbar, DatePipe],
  templateUrl: './outfits.html',
  styleUrl: './outfits.scss',
})
export class Outfits implements OnInit {

  private outfitService = inject(Outfit);
  private cdr = inject(ChangeDetectorRef);

  outfits: OutfitModel[] = [];
  isLoading: boolean = false;
  isGenerating: boolean = false;
  isLoadingRecommendation: boolean = false;
  errorMessage: string = '';
  recommendation: string = '';
  apiUrl = environment.apiUrl;

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
      error: (err) => {
        this.errorMessage = err.status === 404
          ? 'Аутфит не найден или не принадлежит вам'
          : 'Ошибка при удалении аутфита';
        this.cdr.detectChanges();
      }
    });
  }
  recommendationHtml: string = '';

  onGetRecommendation(): void {
    this.isLoadingRecommendation = true;
    this.recommendation = '';
    this.recommendationHtml = '';
    this.errorMessage = '';
  
    this.outfitService.getRecommendation().subscribe({
      next: (data) => {
        this.recommendation = data.recommendation;
        this.recommendationHtml = marked(data.recommendation) as string;
        this.isLoadingRecommendation = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Ошибка при получении рекомендации';
        this.isLoadingRecommendation = false;
        this.cdr.detectChanges();
      }
    });
  }
}