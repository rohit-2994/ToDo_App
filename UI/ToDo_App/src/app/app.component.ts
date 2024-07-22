import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ToDo_App';
  readonly APIUrl="http://localhost:5038/API/ToDo_App/";
  constructor(private http:HttpClient){

  }
  notes:any=[];

  refreshNotes(){
    this.http.get(this.APIUrl+'GetNotes').subscribe(data=>{
      this.notes=data;
    })
  }

  ngOnInit(){
    this.refreshNotes();
  }

  addNotes(){
    var newNotes=(<HTMLInputElement>document.getElementById("newNotes")).value;
    var formData=new FormData();
    formData.append("newNotes", newNotes);
    this.http.post(this.APIUrl+'AddNotes', formData).subscribe (data=>{
    alert(data);
    this.refreshNotes();
    })
    deleteNotes (id:any) {
    this.http.delete(this.APIUrl+'DeleteNotes?id='+id).subscribe(data=>{
    alert(data);
    this.refreshNotes();
    })
    }
  
}
