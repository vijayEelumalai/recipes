import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.modal";

export interface AuthResponseData{
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?: boolean
}

@Injectable({
    providedIn:'root'
})

export class AuthService{
    user= new BehaviorSubject<User>(null);
    private tokenExpiration:any;
    constructor(private http:HttpClient,
        private router:Router){}

signup(email:string, password:string){
return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBcp3QMPuIOEwwo9EjMe1qkvbJRsPlMzqw', {
    email:email,
    password:password,
    returnSecureToken:true
}).pipe(catchError(this.handleError), tap(data =>{
    this.handleAuthentication(data.email, data.localId, data.idToken, data.expiresIn);
}))
}

login(email:string, password:string){
   return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBcp3QMPuIOEwwo9EjMe1qkvbJRsPlMzqw', {
    email:email,
    password:password,
    returnSecureToken:true  
   }).pipe(catchError(this.handleError), tap(data =>{
       this.handleAuthentication(data.email, data.localId, data.idToken, data.expiresIn);
   }))
}

autoLogin(){
const userData:{
    email:string,
    localId:string,
    _token:string,
    _tokenExpirationDate:string
} = JSON.parse(localStorage.getItem('userData'));

if(!userData){
    return;
}

const loadedUser = new User(userData.email, userData.localId, userData._token, new Date(userData._tokenExpirationDate));

if(loadedUser.token){
    this.user.next(loadedUser);  
    const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
    this.autoLogout(expirationDuration);
}
}

private handleError(errorRes:HttpErrorResponse){
let errorMsg = 'Unknown Error Occured';
if(!errorRes.error || !errorRes.error.error){
    return throwError(errorMsg);
}
switch(errorRes.error.error.message){
    case 'EMAIL_EXISTS':
        errorMsg = 'This Email is already Exists';
        break;
    case 'EMAIL_NOT_FOUND':
        errorMsg = 'This Email is not Registered';
        break;
    case 'INVALID_PASSWORD':
        errorMsg= 'The password is Invalid';
        break;
}
return throwError(errorMsg);
}

private handleAuthentication(email:string, localId:string, idToken:string, expiresIn:string){
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
const user = new User(email, localId, idToken, expirationDate);
this.user.next(user);
localStorage.setItem('userData', JSON.stringify(user));
this.autoLogout(+expiresIn * 1000);
}

logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
if(this.tokenExpiration){
    clearTimeout(this.tokenExpiration);
}
this.tokenExpiration = null;
}

autoLogout(expirationDuration:number){
this.tokenExpiration = setTimeout(()=>{
    this.logout();
}, expirationDuration);
}
}