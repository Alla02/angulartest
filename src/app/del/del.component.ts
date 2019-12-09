import { Component, OnInit } from '@angular/core';
import {GlobalsService} from "../globals.service";
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService, StorageTranscoders } from 'ngx-webstorage-service';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-del',
  templateUrl: './del.component.html',
  styleUrls: ['./del.component.css']
})
export class DelComponent implements OnInit {

  titlepage = 'Удаленные';
  search : FormControl;
  filteredResult : any;
  constructor( private globals: GlobalsService, @Inject(LOCAL_STORAGE) private storage: StorageService ) {
  }

  ngOnInit() {
    this.search = new FormControl(); //поиск по смайликам
    this.filteredResult = this.globals.emojisDel;
    this.search.valueChanges.subscribe(val => {
        this.filteredResult = this.globals.emojisDel;
        if (val==='') this.filteredResult = this.globals.emojisDel; //если пустой запрос
        else {
          this.filteredResult = Object.keys(this.filteredResult)
            .filter(key => key.includes(val))
            .reduce((obj, key) => {
              console.log(key);
              obj[key] = this.globals.emojisDel[key];
              return obj;
            }, {});
        }
      }
    );
  }

  public selected; public notSelected;

  public showFullImage(event: any, item: any) {//показать полноразмерное изображение
    this.selected = item.key;
    this.notSelected = item.key;
  }

  public hideFullImage(event: any, item: any) {//скрыть полноразмерное изображение
    this.selected = "";
    this.notSelected = "";
  }

  recover(key, val){//востановить смайлик в список общих
    this.globals.emojisAll[key] = val;
    this.storage.set("storedAll", this.globals.emojisAll);
    delete this.globals.emojisDel[key];
    this.storage.set("storedDel", this.globals.emojisDel);
  }

}
