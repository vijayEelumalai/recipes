import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Recipe } from "../recipes/recipe.modal";
import { RecipeService } from "../recipes/recipe.service";
import { DataStorageService } from "./data-storage.service";

@Injectable({
    providedIn:'root'
})

export class DataResolver implements Resolve<Recipe[]>{
    constructor(private dataStorageService:DataStorageService,
        private recipeService:RecipeService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        const recipe = this.recipeService.getRecipes();
        if(recipe.length === 0){
            return this.dataStorageService.fetchData();
        }else{
            return recipe;
        }
    }
}