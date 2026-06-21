import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WardrobeService } from '../../../core/services/wardrobe';
import { Navbar } from '../../../shared/components/navbar/navbar';
@Component({
  selector: 'app-edit-item',
  imports: [ReactiveFormsModule, Navbar],
  templateUrl: './edit-item.html',
  styleUrl: './edit-item.scss',
})
export class EditItem implements OnInit {

  private fb = inject(FormBuilder);
  private wardrobeService = inject(WardrobeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  itemForm: FormGroup;
  itemId!: number;
  selectedFile: File | null = null;
  currentImage: string | null = null;
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

  ngOnInit(): void {
    this.itemId = Number(this.route.snapshot.params['id']);
    this.loadItem();
  }

  loadItem(): void {
    this.wardrobeService.getItem(this.itemId).subscribe({
      next: (item) => {
        this.itemForm.patchValue({
          name: item.name,
          category: item.category,
          color: item.color,
          season: item.season,
        });
        this.currentImage = item.image;
      },
      error: () => {
        this.errorMessage = 'Не удалось загрузить вещь';
      }
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

    this.wardrobeService.updateItem(this.itemId, formData).subscribe({
      next: () => {
        this.router.navigate(['/wardrobe']);
      },
      error: () => {
        this.errorMessage = 'Ошибка при обновлении вещи';
        this.isLoading = false;
      }
    });
  }
}