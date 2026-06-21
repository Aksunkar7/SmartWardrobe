import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WardrobeService } from '../../../core/services/wardrobe';

@Component({
  selector: 'app-add-item',
  imports: [ReactiveFormsModule],
  templateUrl: './add-item.html',
  styleUrl: './add-item.scss',
})
export class AddItem {

  private fb = inject(FormBuilder);
  private wardrobeService = inject(WardrobeService);
  private router = inject(Router);

  itemForm: FormGroup;
  selectedFile: File | null = null;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor() {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      color: ['', Validators.required],
      season: ['', Validators.required],
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.itemForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const formData = new FormData();
    formData.append('name', this.itemForm.value.name);
    formData.append('category', this.itemForm.value.category);
    formData.append('color', this.itemForm.value.color);
    formData.append('season', this.itemForm.value.season);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.wardrobeService.createItem(formData).subscribe({
      next: () => {
        this.router.navigate(['/wardrobe']);
      },
      error: () => {
        this.errorMessage = 'Ошибка при добавлении вещи';
        this.isLoading = false;
      }
    });
  }
}