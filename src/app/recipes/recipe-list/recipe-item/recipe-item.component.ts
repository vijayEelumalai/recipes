import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../recipe.modal';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
@Input() recipe:Recipe;
@Input() id:number;
  constructor(private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.router.navigate([this.id], {relativeTo:this.route});
  }

}
