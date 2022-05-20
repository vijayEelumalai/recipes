import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthInterceptorService } from "./auth-interceptor.service";
import { AuthComponent } from "./auth.component";

@NgModule({
    declarations:[
        AuthComponent
    ],
    imports:[
      RouterModule.forChild([{path:'', component:AuthComponent}]),
      SharedModule,
      FormsModule,
    
    ],
    providers:[{
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptorService,
      multi:true
    }]
})
export class AuthModule{

}