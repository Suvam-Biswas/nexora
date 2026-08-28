import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, retry, shareReplay, tap, throwError } from 'rxjs';

import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Fin_year_Change, ILoginItem, ILoginPayload, ILoginResponse, PermissionReqApi } from './auth.interfaces';
import { UserProfile } from './user-profile';
import { ResponseApi } from './ResponseApi';


const AUTH_DATA = 'auth_data'


@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {

  jwtHelper = new JwtHelperService()

  public userProfile = new BehaviorSubject<UserProfile | null>(null)

  public subject = new BehaviorSubject<any>(null)
  user$: Observable<ILoginItem> = this.subject.asObservable();


  isLoggedIn$: Observable<boolean>
  isLoggedOut$: Observable<boolean>
  userName$: Observable<string>


  accessToken = '';


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'withCredentials': 'true'
    }),
  };

  constructor(private http: HttpClient) {

    this.isLoggedIn$ = this.user$.pipe(map(user => !!user))
    this.isLoggedOut$ = this.user$.pipe(map(isLoggedIn => !isLoggedIn))
    this.userName$ = this.user$.pipe(map(user => user === null ? '' : user.userName))


    //  const user= sessionStorage.getItem(AUTH_DATA);
    //  if(user){
    //    this.subject.next(JSON.parse(user));
    //  }

  }


  getAccessToken() {
    console.log('pp');
    const token = sessionStorage.getItem(AUTH_DATA)
    if (!token) {
      console.log('qq');
      return;
    }
    var code = this.jwtHelper.decodeToken(token as string) as UserProfile
    this.userProfile.next(code);
    // console.log(code);
    return token

  }

  login(name: string, password: string): Observable<any> {
    console.log(environment.apiEndpoint + 'XXXXXXX');

    return this.http.post<ResponseApi>(environment.apiEndpoint + '/User/home',
      { 'userName': name, 'userPW': password }, this.httpOptions
    ).pipe(
      tap(user => {
        this.subject.next(user.result);
        sessionStorage.setItem(AUTH_DATA, JSON.stringify(user.message))
        var code = this.jwtHelper.decodeToken(user.message) as UserProfile

        this.userProfile.next(code);

      }),
      shareReplay()
    );
  }

  verifyOtp(payload: any): Observable<any> {
    const apiUrl = environment.apiEndpoint + '/api/User/VerifyOTP';
    return this.http.post<any>(apiUrl, payload).pipe(
      tap(res => {
        if (res.status === 'success') {
          console.log('OTP Verified Successfully');
          // You can store anything if needed, e.g., a token
          // sessionStorage.setItem('OTP_VERIFIED', JSON.stringify(res.result));
        } else {
          console.warn('OTP Verification failed:', res.message);
        }
      }),
      shareReplay()
    );
  }



  changePassword(data: { staffNo: string; currentPassword: string; newPassword: string }): Observable<ILoginResponse> {
    const apiUrl = environment.apiEndpoint + '/api/User/MemberChangePassword';

    return this.http.post<ILoginResponse>(apiUrl, data)
      .pipe(
        tap(response => {
          if (response.status === 'success') {
            console.log('Password changed successfully:', response.message);
          } else {
            console.warn('Password change failed:', response.message);
          }
        }),
        shareReplay()
      );
  }


  MemberSignUp(data: ILoginPayload): Observable<ILoginResponse> {
    const apiUrl = environment.apiEndpoint + '/api/User/MemberSignUp';
    return this.http.post<ILoginResponse>(apiUrl, data)
      .pipe(
        tap(user => {
          this.subject.next(user.result);

          // Only decode if status is success
          if (user.status === 'success' && user.message) {
            try {
              sessionStorage.setItem(AUTH_DATA, JSON.stringify(user.message));
              var code = this.jwtHelper.decodeToken(user.message) as UserProfile;
              this.userProfile.next(code);
            } catch (err) {
              console.error('JWT decode failed:', err);
            }
          }
        }),
        shareReplay()
      );
  }


  user(): Observable<any> {
    return this.http.get<ResponseApi>(environment.apiEndpoint + '/User/User')
      .pipe(shareReplay());
  }

  refresh(token: string): Observable<any> {



    let token1 = token.replace(/^"(.*)"$/, '$1')
    token1 = 'bearer ' + token1

    const payload = {
      'token': token1
    }
    return this.http.post(environment.apiEndpoint + '/User/Refresh',
      JSON.stringify(payload),
      this.httpOptions)
  }


  logout() {
    console.log("service")
    const token = sessionStorage.getItem("auth_data");

    let token1 = token?.replace(/^"(.*)"$/, '$1')
    token1 = 'bearer ' + token1

    const payload = {
      'token': token1
    }

    return this.http.post(environment.apiEndpoint + '/User/logout',
      JSON.stringify(payload),
      this.httpOptions).pipe(
        tap(() => {
          this.subject.next(null);
          this.userProfile.next(null);
          sessionStorage.removeItem(AUTH_DATA);

        }),
        shareReplay()
      );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(environment.apiEndpoint + '/api/User/ForgotPassword',
      JSON.stringify(email),
      this.httpOptions)
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(environment.apiEndpoint + '/api/User/ChangePassword',
      JSON.stringify(data),
      this.httpOptions)
  }

  resetForgotPassword(data: any): Observable<any> {
    return this.http.post(environment.apiEndpoint + '/api/User/ResetPassword',
      JSON.stringify(data),
      this.httpOptions)
  }

  getUserName(): Observable<string> {
    return this.user$.pipe(map(user => user.userName))
  }

  changeFinancialYear(data: Fin_year_Change): Observable<any> {
    return this.http.post<ResponseApi>(environment.apiEndpoint + '/api/User/FinancialYearChange',
      JSON.stringify(data), this.httpOptions
    ).pipe(
      tap(user => {
        this.subject.next(user.result);
        sessionStorage.setItem(AUTH_DATA, JSON.stringify(user.message))
        var code = this.jwtHelper.decodeToken(user.message) as UserProfile

        this.userProfile.next(code);

      }),
      shareReplay()
    );
  }

  CreateNewFinYear(payload: any): Observable<any> {
    const apiUrl = environment.apiEndpoint + '/api/FinYear/CreateNewFinYear';
    return this.http.post<any>(apiUrl, payload);
  }

  getMenu(userId: number): Observable<any> {
    const payload = {
      userId: userId
    }
    return this.http.post(environment.apiEndpoint + '/MasterFrom/GetAll',
      JSON.stringify(payload),
      this.httpOptions)
  }

  Get_ERP_MENU(userId: number): Observable<any> {
    const payload = {
      userId: userId
    }
    return this.http.post(environment.apiEndpoint + '/MasterFrom/Get_ERP_MENU',
      JSON.stringify(payload),
      this.httpOptions)
  }



  GetPermission(payload: any): Observable<any> {
    const apiUrl = environment.apiEndpoint + '/api/UserGroupMaster/GetPermission';
    return this.http.post<PermissionReqApi>(apiUrl, payload);
  }

  handleError(error: any) {
    return throwError(() => {
      console.log(`Error Code: ${error.status}\nMessage: ${error.message}`);
      return error;
    });
  }

}
