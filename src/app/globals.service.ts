import {  Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})

export class GlobalsService { //глобальные переменные для хранения списков смайликов
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
  }
  emojisAll: Object = this.storage.get("storedAll");
  emojisFav: Object = this.storage.get("storedFav");
  emojisDel: Object = this.storage.get("storedDel");
}
