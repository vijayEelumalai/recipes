import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  signupForm:FormGroup;
  editMode = false;
 id:number;

 get controls(){
   return (<FormArray>this.signupForm.get('ingredients')).controls;
 }

  constructor(private route:ActivatedRoute, private recipeService:RecipeService, private router:Router){}
 

  ngOnInit(): void {
this.route.params.subscribe((params:Params) =>{
  this.editMode = params['id'] != null;
  this.id = +params['id'];
  this.inItForm();     
}) 
}

private inItForm(){
  let recipeName='';
  let recipeImagePath='';
  let recipeDescription='';
  let recipeIngredients = new FormArray([]);

  if(this.editMode){
    const recipe = this.recipeService.getRecipe(this.id);
    recipeName = recipe.name;
    recipeImagePath = recipe.imagePath;
    recipeDescription = recipe.description;

    if(recipe['ingredients']){
      for(let ingredient of recipe.ingredients){
        recipeIngredients.push(new FormGroup({
          name: new FormControl(ingredient.name, Validators.required),
          amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        }))
      }
    }
  }

  this.signupForm = new FormGroup({
    name: new FormControl(recipeName, Validators.required),
    imagePath: new FormControl(recipeImagePath, Validators.required),
    description: new FormControl(recipeDescription, Validators.required),
    ingredients: recipeIngredients
  })
}

onAddIngredients(){
  (<FormArray>this.signupForm.get('ingredients')).push(new FormGroup({
    name: new FormControl(null, Validators.required), 
    amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
  }))
}

onSubmit(){
  if(this.editMode){
    this.recipeService.updateRecipe(this.id, this.signupForm.value);
  } else{
    this.recipeService.addRecipe(this.signupForm.value);
  }
}

onRemove(index:number){
  (<FormArray>this.signupForm.get('ingredients')).removeAt(index); 
}

onCancel(){
this.router.navigate(['../'], {relativeTo:this.route});
}


}
