import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredients.modal";

@Injectable({
    providedIn:'root'
})
export class ShoppingListService{
   private ingredients:Ingredient[] = [new Ingredient('apple', 50), new Ingredient('orange', 60)];
ingredientAdded = new Subject<Ingredient[]>();
ingredientEdited = new Subject<number>();

getIngredients(){
    return this.ingredients.slice();
}

getIngredient(index:number){
    return this.ingredients[index];
}

addIngredient(ingredient:Ingredient){
this.ingredients.push(ingredient);
this.ingredientAdded.next(this.ingredients.slice());
}

ingredientsFromRecipe(ingredient:Ingredient[]){
this.ingredients.push(...ingredient);
this.ingredientAdded.next(this.ingredients.slice());
}

updateIngredient(index:number, newIngredient:Ingredient){
this.ingredients[index] = newIngredient;
this.ingredientAdded.next(this.ingredients.slice());
}

DeleteIngredient(index:number){
this.ingredients.splice(index, 1);
this.ingredientAdded.next(this.ingredients.slice());
}
}