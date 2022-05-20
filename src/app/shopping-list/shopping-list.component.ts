import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredients.modal';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
ingredients:Ingredient[] = [];
ingredientSub:Subscription;
  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {
   this.ingredients = this.slService.getIngredients();
  this.ingredientSub = this.slService.ingredientAdded.subscribe((ingredients:Ingredient[])=>{
this.ingredients = ingredients;
   } )
  }

  onEdit(index:number){
this.slService.ingredientEdited.next(index);
  }

  ngOnDestroy(): void {
    this.ingredientSub.unsubscribe();
  }
  
}
