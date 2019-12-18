import {Component, Inject, OnInit} from '@angular/core';
import {GlobalsService} from './../globals.service'
import { LOCAL_STORAGE, StorageService, StorageTranscoders } from 'ngx-webstorage-service';
import { FormGroup, FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {combineLatest, Observable, of} from 'rxjs';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.css']
})
export class FavComponent implements OnInit {

  titlepage = 'Любимые';

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
    this.filteredResult = this.globals.emojisFav;
    this.search.valueChanges.subscribe(val => {
        this.filteredResult = this.globals.emojisFav;
        this.filteredResult = this.globals.formFunction(this.globals.emojisFav,val,this.filteredResult);
      }
    );
  }

  /**
   * Удалить из списка любимых.
   *
   * @param key - ключ смайлика, который нужно удалить
   *
   */
  delFav(key){
    delete this.globals.emojisFav[key];
    this.storage.set("storedFav", this.globals.emojisFav);
  }
}
