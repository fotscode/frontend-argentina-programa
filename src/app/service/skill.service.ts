import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, timeout } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Skill } from '../interface/skill'
import { SkillResponse } from '../interface/responses/skill-response'

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private readonly apiUrl = `${environment.baseApiUrl}/skill`
  constructor(private http: HttpClient) {}
  getSkills(): Observable<SkillResponse> {
    return this.http
      .get<SkillResponse>(`${this.apiUrl}/list`)
      .pipe(timeout(10000))
  }

  getSkill(id: number): Observable<SkillResponse> {
    return this.http
      .get<SkillResponse>(`${this.apiUrl}/get/${id}`)
      .pipe(timeout(10000))
  }

  updateSkill(skill: Skill): Observable<SkillResponse> {
    return this.http
      .put<SkillResponse>(`${this.apiUrl}/update`, skill)
      .pipe(timeout(10000))
  }

  createSkill(skill: Skill): Observable<SkillResponse> {
    return this.http
      .post<SkillResponse>(`${this.apiUrl}/save`, skill)
      .pipe(timeout(10000))
  }

  deleteSkill(id: number): Observable<SkillResponse> {
    return this.http
      .delete<SkillResponse>(`${this.apiUrl}/delete/${id}`)
      .pipe(timeout(10000))
  }
}
