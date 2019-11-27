import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {GlobalsService} from "../globals.service";
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService, StorageTranscoders } from 'ngx-webstorage-service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  titlepage = 'Все';
  constructor( private data: DataService, private globals: GlobalsService, @Inject(LOCAL_STORAGE) private storage: StorageService ) {
    this.storage = storage.withDefaultTranscoder(StorageTranscoders.JSON);
  }

  ngOnInit() {
  }
  getAll(){
    this.data.getEmojis().subscribe(data =>{
      this.storage.remove("storedAll");
      this.storage.remove("storedFav");
      this.storage.remove("storedDel");
      this.globals.emojisAll = data;
      this.storage.set("storedAll", this.globals.emojisAll);
      this.globals.emojisFav = {};
      this.storage.set("storedFav", this.globals.emojisFav);
      this.globals.emojisDel = {};
      this.storage.set("storedDel", this.globals.emojisDel);
    });
  }

  addFav(key, val){
    this.globals.emojisFav[key] = val;
    this.storage.set("storedFav", this.globals.emojisFav);
    console.log(this.globals.emojisFav);  }
  delEmoji(key, val){
    delete this.globals.emojisAll[key];
    this.globals.emojisDel[key] = val;
    this.storage.set("storedAll", this.globals.emojisAll);
    this.storage.set("storedDel", this.globals.emojisDel);
  }

}
