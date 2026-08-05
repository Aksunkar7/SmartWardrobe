import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { WardrobeItem } from './wardrobe';
import { switchMap, takeWhile} from 'rxjs/operators';

  export interface OutfitModel {
    id: number;
    name: string;
    created_at: string;
    items: WardrobeItem[];
  }

  export interface CachedRecommendation {
    recommendation: string;
    cached: true;
  }
  
  export interface RecommendationStarted {
    task_id: string;
  }
  
  export type RecommendationResponse = CachedRecommendation | RecommendationStarted;
  
  export interface TaskStatusResponse {
    status: 'PENDING' | 'STARTED' | 'SUCCESS' | 'FAILURE';
    result?: string;
    error?: string;
  }

  @Injectable({
    providedIn: 'root',
  })
  export class Outfit {

    private readonly API = `${environment.apiUrl}/outfits`;
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

    getRecommendation(): Observable<RecommendationResponse> {
      return this.http.get<RecommendationResponse>(`${this.API}/recommend/`);
    }

    getTaskStatus(taskId: string): Observable<TaskStatusResponse> {
      return this.http.get<TaskStatusResponse>(`${this.API}/tasks/${taskId}/status/`);
    }

    pollTaskStatus(taskId: string): Observable<TaskStatusResponse> {
      return interval(2000).pipe(
        switchMap(() => this.getTaskStatus(taskId)),
        takeWhile(
          (status) => status.status === 'PENDING' || status.status === 'STARTED',
          true
        )
      );
    }
  }