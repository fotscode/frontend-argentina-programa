import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experience } from '../interface/experience';
import { ExperienceResponse } from '../interface/responses/experience-response';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private readonly apiUrl = `${environment.baseApiUrl}/experience`

  constructor(private http:HttpClient) { }

  getExperiences(): Observable<ExperienceResponse> {
    return this.http.get<ExperienceResponse>(`${this.apiUrl}/list`);
  }

  getExperience(id: number): Observable<ExperienceResponse>{
    return this.http.get<ExperienceResponse>(`${this.apiUrl}/get/${id}`);
  }

  updateExperience(experience:Experience): Observable<ExperienceResponse> {
    return this.http.put<ExperienceResponse>(`${this.apiUrl}/update`,experience);
  }

  createExperience(experience:Experience): Observable<ExperienceResponse> {
    return this.http.post<ExperienceResponse>(`${this.apiUrl}/save`,experience);
  }

  deleteExperience(id: number): Observable<ExperienceResponse>{
    return this.http.delete<ExperienceResponse>(`${this.apiUrl}/delete/${id}`);
  }
}
