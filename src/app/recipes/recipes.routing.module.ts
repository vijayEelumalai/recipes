import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../Auth/auth-guard.service";
import { DataResolver } from "../shared/data-resolver.service";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";

const routes:Routes = [
    {path:'', component:RecipesComponent, canActivate:[AuthGuardService], children:[
        {path:'', component:RecipeStartComponent},
        {path:'new', component:RecipeEditComponent},
        {path:':id', component:RecipeDetailComponent, resolve:[DataResolver]},
        {path:':id/edit', component:RecipeEditComponent, resolve:[DataResolver]}
      ]}
];

@NgModule({
imports:[RouterModule.forChild(routes)], 
exports:[RouterModule]
})

export class RecipeRoutingModule{}