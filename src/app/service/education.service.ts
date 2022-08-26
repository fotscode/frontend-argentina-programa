import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Education } from '../interface/education'
import { EducationResponse } from '../interface/responses/education-response'
import { retry, timeout } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  private readonly apiUrl = `${environment.baseApiUrl}/education`

  constructor(private http: HttpClient) {}

  getEducations(): Observable<EducationResponse> {
    return this.http
      .get<EducationResponse>(`${this.apiUrl}/list`)
      .pipe(timeout(10000),retry(10))
  }

  getEducation(id: number): Observable<EducationResponse> {
    return this.http
      .get<EducationResponse>(`${this.apiUrl}/get/${id}`)
      .pipe(timeout(10000),retry(10))
  }

  updateEducation(education: Education): Observable<EducationResponse> {
    return this.http
      .put<EducationResponse>(`${this.apiUrl}/update`, education)
      .pipe(timeout(10000),retry(10))
  }

  createEducation(education: Education): Observable<EducationResponse> {
    return this.http
      .post<EducationResponse>(`${this.apiUrl}/save`, education)
      .pipe(timeout(10000),retry(10))
  }

  deleteEducation(id: number): Observable<EducationResponse> {
    return this.http
      .delete<EducationResponse>(`${this.apiUrl}/delete/${id}`)
      .pipe(timeout(10000),retry(10))
  }
}
