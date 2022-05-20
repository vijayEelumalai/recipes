import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredients.modal';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
@ViewChild('form', {static:true}) slForm:NgForm;
ingSubscription:Subscription;
  editMode = false;
  editedItem:Ingredient;
editedItemIndex:number;
  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {
   this.ingSubscription = this.slService.ingredientEdited.subscribe((index:number) =>{
      this.editMode = true;
this.editedItemIndex = index;
this.editedItem = this.slService.getIngredient(index);
this.slForm.setValue({
  name:this.editedItem.name,
  amount:this.editedItem.amount
})
})
}

  onSubmit(){
    const value = this.slForm.value;
  const ingredient = new Ingredient(value.name, value.amount);
if(this.editMode){
  this.slService.updateIngredient(this.editedItemIndex, ingredient);
}else{
  this.slService.addIngredient(ingredient);
}
this.editMode = false;
this.slForm.reset();
}

  onClear(){
    this.slForm.reset();
  }

  onDelete(){
this.slService.DeleteIngredient(this.editedItemIndex);
this.slForm.reset();
  }

  ngOnDestroy(): void {
    this.ingSubscription.unsubscribe();
  }

}
