import {Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../Auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
selector: 'app-header',
templateUrl: 'header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy{
authSub:Subscription;
isAuthenticated = false;

constructor(private authService:AuthService, private dataStorageService:DataStorageService){}

  ngOnInit(): void {
      this.authSub = this.authService.user.subscribe(user =>{
this.isAuthenticated= !!user;
      })
  }
    
    onSaveData(){
this.dataStorageService.sendData();
    }

    onFetchData(){
this.dataStorageService.fetchData().subscribe();
    }

    onLogout(){
this.authService.logout();
    }

    ngOnDestroy(): void {
        this.authSub.unsubscribe();
    }
}