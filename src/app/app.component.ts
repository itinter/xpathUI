import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
	constructor(private http:Http){}
  html = '';
  title = 'app';
  getxpath(url:string){
  	 var url1 =url.replace('http://','');
  	 url1=url1+'.';
     this.http.get('http://localhost:8080/xpath/getxpath/'+url1).subscribe(data => console.log(data));
  }
  savexpath(){
  	 this.http.get('http://localhost:8080/xpath/save/').subscribe(data => console.log(data));
  }
  getxpath2(url:string){
  	 var url1 =url.replace('http://','');
  	 url1=url1+'.';
     this.http.get('http://localhost:8080/xpath/getxpath2/'+url1).subscribe(data => this.html=data.text());
  }
}
