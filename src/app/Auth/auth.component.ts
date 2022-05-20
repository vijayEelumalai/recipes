import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { alertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
    selector:'app-auth',
    templateUrl: 'auth.component.html',
})
export class AuthComponent {
isLogin = true;
isLoading= false;
error:string = null;
authObs:Observable<AuthResponseData>;
@ViewChild(PlaceholderDirective) alertHost:PlaceholderDirective;
closeSub:Subscription;

constructor(private authService:AuthService, private router:Router){}

onSwitch(){
    this.isLogin = !this.isLogin;
}

onHandleError(){
    this.error = null;
}

onSubmit(form:NgForm){
    if(form.invalid){
        return;
    }
const email = form.value.email;
const password = form.value.password;
this.isLoading=true;
if(this.isLogin){
 this.authObs = this.authService.login(email, password);
}else{
     this.authObs = this.authService.signup(email, password);
}
this.authObs.subscribe(resData =>{
    console.log(resData);
    this.isLoading=false;
this.router.navigate(['/recipes']);
}, error =>{
    console.log(error);
    this.isLoading=false;
    this.error = error;
    this.showErrorAlert(error);    
})

form.reset();
}

private showErrorAlert(message:string){
const hostContainerRef =this.alertHost.viewContainerRef;
hostContainerRef.clear();
const hostComponent = hostContainerRef.createComponent(alertComponent);
hostComponent.instance.message = message;
this.closeSub = hostComponent.instance.close.subscribe(()=>{
this.closeSub.unsubscribe();
hostContainerRef.clear();
})
}


}