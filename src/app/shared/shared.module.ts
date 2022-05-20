import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { alertComponent } from "./alert/alert.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder.directive";

@NgModule({
declarations:[
    LoadingSpinnerComponent,
    alertComponent,
    PlaceholderDirective
],
imports:[
    CommonModule
],
exports:[
    LoadingSpinnerComponent,
    alertComponent,
    PlaceholderDirective,
    CommonModule
]
})

export class SharedModule{

}