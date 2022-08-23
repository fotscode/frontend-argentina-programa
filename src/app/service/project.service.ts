import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Project } from '../interface/project'
import { ProjectResponse } from '../interface/responses/project-response'

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly apiUrl = `${environment.baseApiUrl}/project`

  constructor(private http: HttpClient) {}

  getProjects(): Observable<ProjectResponse> {
    return this.http.get<ProjectResponse>(`${this.apiUrl}/list`)
  }

  getProject(id: number): Observable<ProjectResponse> {
    return this.http.get<ProjectResponse>(`${this.apiUrl}/get/${id}`)
  }

  updateProject(project: Project): Observable<ProjectResponse> {
    return this.http.put<ProjectResponse>(`${this.apiUrl}/update`, project)
  }

  createProject(project: Project): Observable<ProjectResponse> {
    return this.http.post<ProjectResponse>(`${this.apiUrl}/save`, project)
  }

  deleteProject(id: number): Observable<ProjectResponse> {
    return this.http.delete<ProjectResponse>(`${this.apiUrl}/delete/${id}`)
  }
}
