import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ILoginPayload, ILoginResponse } from './auth.interfaces';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  public getLoginData(data: ILoginPayload): Observable<ILoginResponse>{
    const apiUrl = environment.apiEndpoint + '/api/UserLogin/home'; 
    return this.http.post<ILoginResponse>(apiUrl, data);
  }
}
