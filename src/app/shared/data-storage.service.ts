import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs";

import { Recipe } from "../recipes/recipe.modal";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({
    providedIn:'root'
})

export class DataStorageService{
    constructor(private http:HttpClient,
        private recipeService:RecipeService,
        ){}

    sendData(){
        const recipe = this.recipeService.getRecipes();
        this.http.put('https://backend-services-test-76035-default-rtdb.firebaseio.com/posts.json', recipe).subscribe(recipes =>{
            console.log(recipes);
        })
    }

    fetchData(){
      
           return this.http.get<Recipe[]>('https://backend-services-test-76035-default-rtdb.firebaseio.com/posts.json').pipe(map(recipes =>{
            return recipes.map(recipe =>{
                return {...recipe, ingredients:recipe.ingredients? recipe.ingredients: []};
            })
        }), tap(recipes =>{
            console.log(recipes);
            this.recipeService.setRecipe(recipes);
        }))
    }
}