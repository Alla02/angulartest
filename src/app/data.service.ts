import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = 'https://api.github.com/emojis'; //адрес, откуда берутся смайлики
  constructor(private http: HttpClient) { }
  getEmojis(){
    return this.http.get(this.url)
  }
}
