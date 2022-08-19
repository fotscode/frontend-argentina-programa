import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { CustomResponse } from '../interface/custom-response'
import { Profile } from '../interface/profile'

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly apiUrl = `${environment.baseApiUrl}/profile`
  constructor(private http: HttpClient) {}

  getProfile(id: number): Observable<CustomResponse>{
    return this.http.get<CustomResponse>(`${this.apiUrl}/get/${id}`);
  }

  updateProfile(profile:Profile): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(`${this.apiUrl}/update`,profile);
  }
}
