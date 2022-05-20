import { Injectable } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredients.modal";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.modal";

@Injectable({
    providedIn: 'root'
})

export class RecipeService{
    recipeCopied = new Subject<Recipe[]>();

//    private recipes:Recipe[] = [new Recipe('Tasty Recipe', 'North African and Middle Eastern meal of poached eggs in a simmering tomato sauce', 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg', [
//        new Ingredient('Tomato', 10),
//        new Ingredient('Eggs', 10)
//    ]),
//     new Recipe('Vegetarian Penne Pasta recipe', 'Our Easy Vegetarian Penne Pasta recipe is excellent for entertaining and its a great side dish', 'https://images.herzindagi.info/image/2020/May/desi-pasta-recipe-main.jpg', [
//         new Ingredient('Pasta', 10),
//         new Ingredient('Salt', 1)
//     ])];

private recipes:Recipe[] = [];

    setRecipe(recipes:Recipe[]){
 this.recipes = recipes;
this.recipeCopied.next(this.recipes.slice());
    }

    getRecipes(){
return this.recipes.slice();
    }

    getRecipe(index:number){
        return this.recipes[index];
    }

    constructor(private slService:ShoppingListService){}

    addToShoppinglist(ingredient:Ingredient[]){
this.slService.ingredientsFromRecipe(ingredient);
    }

    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipeCopied.next(this.recipes.slice());
    }

    updateRecipe(index:number, newRecipe:Recipe){
        this.recipes[index]= newRecipe;
        this.recipeCopied.next(this.recipes.slice());
    }

    deleteRecipe(index:number){
        this.recipes.splice(index, 1);
        this.recipeCopied.next(this.recipes.slice());
    }
}