import { Component, OnInit } from '@angular/core';
import {GlobalsService} from "../globals.service";
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService, StorageTranscoders } from 'ngx-webstorage-service';

@Component({
  selector: 'app-del',
  templateUrl: './del.component.html',
  styleUrls: ['./del.component.css']
})
export class DelComponent implements OnInit {

  titlepage = 'Удаленные';
  constructor( private globals: GlobalsService, @Inject(LOCAL_STORAGE) private storage: StorageService ) {
  }

  ngOnInit() {
  }
  recover(key, val){
    this.globals.emojisAll[key] = val;
    this.storage.set("storedAll", this.globals.emojisAll);
    delete this.globals.emojisDel[key];
    this.storage.set("storedDel", this.globals.emojisDel);
  }

}
