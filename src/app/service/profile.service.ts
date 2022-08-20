import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { ProfileResponse } from '../interface/profile-response'
import { Profile } from '../interface/profile'

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly apiUrl = `${environment.baseApiUrl}/profile`
  constructor(private http: HttpClient) {}

  getProfile(id: number): Observable<ProfileResponse>{
    return this.http.get<ProfileResponse>(`${this.apiUrl}/get/${id}`);
  }

  updateProfile(profile:Profile): Observable<ProfileResponse> {
    return this.http.post<ProfileResponse>(`${this.apiUrl}/update`,profile);
  }
}
