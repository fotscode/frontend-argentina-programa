import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Education } from '../interface/education';
import { EducationResponse } from '../interface/responses/education-response';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private readonly apiUrl = `${environment.baseApiUrl}/education`

  constructor(private http:HttpClient) { }

  getEducations(): Observable<EducationResponse> {
    return this.http.get<EducationResponse>(`${this.apiUrl}/list`);
  }

  getEducation(id: number): Observable<EducationResponse>{
    return this.http.get<EducationResponse>(`${this.apiUrl}/get/${id}`);
  }

  updateEducation(education:Education): Observable<EducationResponse> {
    return this.http.put<EducationResponse>(`${this.apiUrl}/update`,education);
  }

  createEducation(education:Education): Observable<EducationResponse> {
    return this.http.post<EducationResponse>(`${this.apiUrl}/save`,education);
  }

  deleteEducation(id: number): Observable<EducationResponse>{
    return this.http.delete<EducationResponse>(`${this.apiUrl}/delete/${id}`);
  }
}
