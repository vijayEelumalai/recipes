import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.modal';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  recipes:Recipe[];
  recipeSub:Subscription;
  constructor(private recipeService:RecipeService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
  this.recipeSub= this.recipeService.recipeCopied.subscribe((recipes =>{
    this.recipes = recipes;
  }))
    this.recipes = this.recipeService.getRecipes();
  }
  
  onNewRecipe(){
this.router.navigate(['new'], {relativeTo:this.route});
  }
 
ngOnDestroy(): void {
  this.recipeSub.unsubscribe();
}
}
