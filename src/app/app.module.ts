import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './Auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,   
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,  
    FormsModule,
    ReactiveFormsModule,  
    HttpClientModule,
    RecipesModule,
    ShoppingListModule, 
    SharedModule,
    CoreModule,
    AuthModule
  ],
  
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
