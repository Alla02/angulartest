import {Component, Inject, OnInit} from '@angular/core';
import {GlobalsService} from './../globals.service'
import { LOCAL_STORAGE, StorageService, StorageTranscoders } from 'ngx-webstorage-service';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.css']
})
export class FavComponent implements OnInit {

  titlepage = 'Любимые';
  constructor( private globals: GlobalsService, @Inject(LOCAL_STORAGE) private storage: StorageService ) {
  }

  ngOnInit() {
  }

  delFav(key, val){
    delete this.globals.emojisFav[key];
    this.storage.set("storedFav", this.globals.emojisFav);
  }

}
