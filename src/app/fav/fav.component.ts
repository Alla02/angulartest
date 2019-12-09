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
  search : FormControl;
  filteredResult : any;

  constructor( private globals: GlobalsService, @Inject(LOCAL_STORAGE) private storage: StorageService ) {
  }
  ngOnInit() {
    this.search = new FormControl(); //поиск по смайликам
    this.filteredResult = this.globals.emojisFav;
    this.search.valueChanges.subscribe(val => {
        this.filteredResult = this.globals.emojisFav;
        if (val==='') this.filteredResult = this.globals.emojisFav; //если пустой запрос
        else {
          this.filteredResult = Object.keys(this.filteredResult)
            .filter(key => key.includes(val))
            .reduce((obj, key) => {
              console.log(key);
              obj[key] = this.globals.emojisFav[key];
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

  delFav(key, val){//удалить из списка любимых
    delete this.globals.emojisFav[key];
    this.storage.set("storedFav", this.globals.emojisFav);
  }
}
