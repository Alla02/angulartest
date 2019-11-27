import { Component, OnInit } from '@angular/core';
import {GlobalsService} from "../globals.service";

@Component({
  selector: 'app-del',
  templateUrl: './del.component.html',
  styleUrls: ['./del.component.css']
})
export class DelComponent implements OnInit {

  titlepage = 'Удаленные';
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
  recover(key, val){
    this.globals.emojisAll[key] = val;
    delete this.globals.emojisDel[key];
  }

}
