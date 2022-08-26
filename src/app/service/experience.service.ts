import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, retry, timeout } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Experience } from '../interface/experience'
import { ExperienceResponse } from '../interface/responses/experience-response'

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  private readonly apiUrl = `${environment.baseApiUrl}/experience`

  constructor(private http: HttpClient) {}

  getExperiences(): Observable<ExperienceResponse> {
    return this.http
      .get<ExperienceResponse>(`${this.apiUrl}/list`)
      .pipe(timeout(10000),retry(3))
  }

  getExperience(id: number): Observable<ExperienceResponse> {
    return this.http
      .get<ExperienceResponse>(`${this.apiUrl}/get/${id}`)
      .pipe(timeout(10000),retry(3))
  }

  updateExperience(experience: Experience): Observable<ExperienceResponse> {
    return this.http
      .put<ExperienceResponse>(`${this.apiUrl}/update`, experience)
      .pipe(timeout(10000),retry(3))
  }

  createExperience(experience: Experience): Observable<ExperienceResponse> {
    return this.http
      .post<ExperienceResponse>(`${this.apiUrl}/save`, experience)
      .pipe(timeout(10000),retry(3))
  }

  deleteExperience(id: number): Observable<ExperienceResponse> {
    return this.http
      .delete<ExperienceResponse>(`${this.apiUrl}/delete/${id}`)
      .pipe(timeout(10000),retry(3))
  }
}
