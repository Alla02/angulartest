import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {GlobalsService} from "../globals.service";
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService, StorageTranscoders } from 'ngx-webstorage-service';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  titlepage = 'Все';
  constructor( private data: DataService, private globals: GlobalsService, @Inject(LOCAL_STORAGE) private storage: StorageService ) {
  }
  search : FormControl;
  filteredResult : any;

  ngOnInit() {
    /**
     * Поиск.
     *
     */
    this.search = new FormControl();
    this.filteredResult = this.globals.emojisAll;
    this.search.valueChanges.subscribe(val => {
      this.filteredResult = this.globals.emojisAll;
        this.filteredResult = this.globals.formFunction(this.globals.emojisAll,val,this.filteredResult);
      }
    );
  }

  /**
   * Функция для первой загрузки или обновления списка смайликов.
   *
   */
  getAll(){
    this.data.getEmojis().subscribe(data =>{
      this.storage.remove("storedAll");
      this.storage.remove("storedFav");
      this.storage.remove("storedDel");
      console.log("getall");
      console.log(data);

      this.globals.emojisAll = data;
      this.storage.set("storedAll", this.globals.emojisAll);
      this.storage.set("storedAll2", Object.keys(this.globals.emojisAll));
      this.globals.emojisFav = {};
      this.storage.set("storedFav", this.globals.emojisFav);
      this.globals.emojisDel = {};
      this.storage.set("storedDel", this.globals.emojisDel);
    });
  }

  /**
   * Добавить в список любимых.
   *
   * @param key - ключ смайлика
   * @param val - значение смайлика
   *
   */
  addFav(key, val){
    this.globals.emojisFav[key] = val;
    this.storage.set("storedFav", this.globals.emojisFav);
    console.log(this.globals.emojisFav);  }
  /**
   * Удалить смайлик.
   *
   * @param key - ключ смайлика
   * @param val - значение смайлика
   *
   */
  delEmoji(key, val){
    delete this.globals.emojisAll[key];
    this.globals.emojisDel[key] = val;
    this.storage.set("storedAll", this.globals.emojisAll);
    this.storage.set("storedDel", this.globals.emojisDel);
  }

}
