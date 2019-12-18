import {  Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import {FormControl} from "@angular/forms";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class GlobalsService { //глобальные переменные для хранения списков смайликов
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router) {
  }

  /**
   * Глобальные переменные для хранения списков.
   *
   */
  emojisAll: Object = this.storage.get("storedAll");
  emojisFav: Object = this.storage.get("storedFav");
  emojisDel: Object = this.storage.get("storedDel");

  /**
   * Функция для фильтрации списка.
   *
   * @param data - полный список
   * @param val - значение, по которому нужно фильтровать
   * @param filtered - список для фильтрации
   *
   * @returns Отфильтрованный список
   *
   */
  formFunction(data,val,filtered) {
    return Object.keys(filtered)
      .filter(key => key.includes(val))
      .reduce((obj, key) => {
        obj[key] = data[key];
        console.log(obj);
        return obj;
      }, {});
  }


  /**
   * Показать полноразмерное изображение.
   *
   * @param item - элемент
   *
   */
  trackByFn(item) {
    return item.key; 
  }

  selected: any; notSelected: any;

  /**
   * Показать полноразмерное изображение.
   *
   * @param item - элемент
   *
   */
  showFullImage(item: any) {
    console.log("globalsshow");
    this.selected = item.key;
    this.notSelected = item.key;
  }

  /**
   * Скрыть полноразмерное изображение.
   *
   * @param item - элемент
   *
   */
  public hideFullImage(item: any) {
    console.log("globalshide");
    this.selected = "";
    this.notSelected = "";
  }
}
