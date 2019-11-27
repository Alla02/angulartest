import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GlobalsService {
  emojisAll: Object;
  emojisFav: Object = {};
  emojisDel: Object = {};
}
