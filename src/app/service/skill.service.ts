import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Skill } from '../interface/skill';
import { SkillResponse } from '../interface/skill-response';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private readonly apiUrl = `${environment.baseApiUrl}/skill`
  constructor(private http:HttpClient) { }
  getSkills(): Observable<SkillResponse> {
    return this.http.get<SkillResponse>(`${this.apiUrl}/list`);
  }

  getSkill(id: number): Observable<SkillResponse>{
    return this.http.get<SkillResponse>(`${this.apiUrl}/get/${id}`);
  }

  updateSkill(skill:Skill): Observable<SkillResponse> {
    return this.http.put<SkillResponse>(`${this.apiUrl}/update`,skill);
  }

  createSkill(skill:Skill): Observable<SkillResponse> {
    return this.http.post<SkillResponse>(`${this.apiUrl}/save`,skill);
  }

  deleteSkill(id: number): Observable<SkillResponse>{
    return this.http.delete<SkillResponse>(`${this.apiUrl}/delete/${id}`);
  }
}
