import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {GlobalsService} from "../globals.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  titlepage = 'Все';
  todoArray=[]
  addTodo(value){
    this.todoArray.push(value);
    console.log(this.todoArray);  }
  deleteItem(todo){
    for(let i=0 ;i<= this.todoArray.length ;i++)
    {
      if(todo== this.todoArray[i])
      {
        this.todoArray.splice(i,1)
      }
    }
  }



  constructor( private data: DataService, private globals: GlobalsService ) {
  }

  ngOnInit() {
  }
  getAll(){
    this.data.getEmojis().subscribe(data =>{
      this.globals.emojisAll = data;
      /*      for(let key in data) {
              let child = data[key];
              console.log(key);
              console.log(child);
            }
            //console.log(data);*/

      console.log(this.globals.emojisAll);
    });
  }

  addFav(key, val){
    this.globals.emojisFav[key] = val;
    console.log(this.globals.emojisFav);  }
  delEmoji(key, val){
    delete this.globals.emojisAll[key];
    this.globals.emojisDel[key] = val;
    //console.log(this.globals.emojisFav);
    console.log(this.globals.emojisDel);
  }

}
