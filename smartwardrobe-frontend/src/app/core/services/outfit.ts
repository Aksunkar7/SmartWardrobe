import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WardrobeItem } from './wardrobe';
import { environment } from '../../../environments/environment';

export interface OutfitModel {
  id: number;
  name: string;
  created_at: string;
  items: WardrobeItem[];
}

@Injectable({
  providedIn: 'root',
})
export class Outfit {

  private readonly API = `${environment.apiUrl}/api/outfits`;
  private http = inject(HttpClient);

  getOutfits(): Observable<OutfitModel[]> {
    return this.http.get<OutfitModel[]>(`${this.API}/`);
  }

  getOutfit(id: number): Observable<OutfitModel> {
    return this.http.get<OutfitModel>(`${this.API}/${id}/`);
  }

  deleteOutfit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}/`);
  }

  generateOutfit(): Observable<OutfitModel> {
    return this.http.post<OutfitModel>(`${this.API}/generate/`, {});
  }
}