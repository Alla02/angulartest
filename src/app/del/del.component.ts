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
  constructor( private globals: GlobalsService, @Inject(LOCAL_STORAGE) private storage: StorageService ) {
  }

  search : FormControl;
  filteredResult : any;
  ngOnInit() {
    /**
     * Поиск.
     *
     */
    this.search = new FormControl();
    this.filteredResult = this.globals.emojisDel;
    this.search.valueChanges.subscribe(val => {
        this.filteredResult = this.globals.emojisDel;
        this.filteredResult = this.globals.formFunction(this.globals.emojisDel,val,this.filteredResult);
      }
    );
  }

  /**
   * Востановить смайлик в список общих.
   *
   * @param key - ключ смайлика
   * @param val - значение смайлика
   *
   */
  recover(key, val){
    this.globals.emojisAll[key] = val;
    this.storage.set("storedAll", this.globals.emojisAll);
    delete this.globals.emojisDel[key];
    this.storage.set("storedDel", this.globals.emojisDel);
  }

}
