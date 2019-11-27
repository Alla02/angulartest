import { Component, OnInit } from '@angular/core';
import {GlobalsService} from './../globals.service'

@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.css']
})
export class FavComponent implements OnInit {

  titlepage = 'Любимые';
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



  constructor( private globals: GlobalsService ) {
  }

  ngOnInit() {
  }

  delFav(key, val){
    delete this.globals.emojisFav[key];
  }

}
