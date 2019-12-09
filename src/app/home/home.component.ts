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
    this.search = new FormControl(); //поиск по смайликам
    this.filteredResult = this.globals.emojisAll;
    this.search.valueChanges.subscribe(val => {
        this.filteredResult = this.globals.emojisAll;
        if (val==='') this.filteredResult = this.globals.emojisAll; //если пустой запрос
        else {
          this.filteredResult = Object.keys(this.filteredResult)
            .filter(key => key.includes(val))
            .reduce((obj, key) => {
              console.log(key);
              obj[key] = this.globals.emojisAll[key];
              return obj;
            }, {});
        }
      }
    );
  }
  getAll(){ //функция для первой загрузки или обновления списка смайликов
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

  public selected; public notSelected;

  public showFullImage(event: any, item: any) { //показать полноразмерное изображение
    this.selected = item.key;
    this.notSelected = item.key;
  }

  public hideFullImage(event: any, item: any) {//скрыть полноразмерное изображение
    this.selected = "";
    this.notSelected = "";
  }

  addFav(key, val){ //добавление в список любимых
    this.globals.emojisFav[key] = val;
    this.storage.set("storedFav", this.globals.emojisFav);
    console.log(this.globals.emojisFav);  }
  delEmoji(key, val){ //удаление из общего списка и добавление в список удаленных
    delete this.globals.emojisAll[key];
    this.globals.emojisDel[key] = val;
    this.storage.set("storedAll", this.globals.emojisAll);
    this.storage.set("storedDel", this.globals.emojisDel);
  }

}
