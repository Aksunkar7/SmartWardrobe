import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface WardrobeItem {
  id: number;
  name: string;
  category: string;
  color: string;
  season: string;
  image: string | null;
  created_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class WardrobeService {

  private readonly API = `${environment.apiUrl}/api/wardrobe`;
  private http = inject(HttpClient);

  getItems(): Observable<WardrobeItem[]> {
    return this.http.get<WardrobeItem[]>(`${this.API}/`);
  }

  getItem(id: number): Observable<WardrobeItem> {
    return this.http.get<WardrobeItem>(`${this.API}/${id}/`);
  }

  createItem(data: FormData): Observable<WardrobeItem> {
    return this.http.post<WardrobeItem>(`${this.API}/`, data);
  }

  updateItem(id: number, data: FormData): Observable<WardrobeItem> {
    return this.http.put<WardrobeItem>(`${this.API}/${id}/`, data);
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}/`);
  }
}