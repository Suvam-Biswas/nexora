

// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { Router } from "@angular/router";
// import { JwtHelperService } from "@auth0/angular-jwt";
// import { Observable, switchMap, throwError } from "rxjs";
// import { AuthStoreService } from "../auth.store.service";
// import { UserProfile } from "../user-profile";

// @Injectable()
// export class AuthTokenInterceptor implements HttpInterceptor {

//   constructor(
//     private jwtHelper: JwtHelperService,
//     private authService: AuthStoreService,
//     private router: Router
//   ) { }

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     if (req.url.indexOf('Login') > -1 || req.url.indexOf('Refresh') > -1
//       || req.url.indexOf('ForgotPassword') > -1 || req.url.indexOf('ResetPassword') > -1 
//       || req.url.indexOf('MemberSignUp') > -1 || req.url.indexOf('MemberChangePassword') > -1
//       || req.url.indexOf('GetHelpJBTPayrollDD') > -1
//     ) {
//       return next.handle(req);
//     }

//     let token = sessionStorage.getItem('auth_data');

//     if (token) {
//       // 🎯 FIX: Remove leading/trailing literal double quotes before processing
//       if (token.startsWith('"') && token.endsWith('"')) {
//         token = token.slice(1, -1);
//       }

//       const isTokenExpired = this.jwtHelper.isTokenExpired(token);

//       // ✅ CASE A: Token is valid
//       if (!isTokenExpired) {
//         const authorizedReq = req.clone({
//           headers: req.headers.set('Authorization', `Bearer ${token}`)
//         });
//         return next.handle(authorizedReq);
//       } 
      
//       // 🔄 CASE B: Token has expired
//       else {
//         return this.authService.refresh(token).pipe(
//           switchMap((res: any) => {
//             if (res.statusCode == '401') {
//               this.router.navigate(['/home']);
//               return throwError(() => 'Invalid call');
//             }
            
//             // Clean up incoming tokens if they are wrapped in quotes
//             let newToken = res.message;
//             sessionStorage.setItem('auth_data', JSON.stringify(newToken));

//             if (newToken.startsWith('"') && newToken.endsWith('"')) {
//                 newToken = newToken.slice(1, -1);
//             }

//             const userInfo = this.jwtHelper.decodeToken(newToken) as UserProfile;
//             this.authService.userProfile.next(userInfo);
            
//             const transformedReq = req.clone({
//               headers: req.headers.set('Authorization', `Bearer ${newToken}`),
//             });
//             return next.handle(transformedReq);
//           })
//         );
//       }
//     }
    
//     this.router.navigate(['/home']);
//     return throwError(() => 'Invalid call');
//   }
// }