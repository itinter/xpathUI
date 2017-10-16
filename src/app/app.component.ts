import { Component } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
	constructor(private http:Http){}
  title = 'Welcome to XPATH Getting Application!';
  // getxpath(url:string){
  // 	 var url1 =url.replace('http://','');
  // 	 url1=url1+'.';
  //    this.http.get('http://localhost:8080/xpath/getxpath/'+url1).subscribe(data => console.log(data));
  // }
  // savexpath(){
  // 	 this.http.get('http://localhost:8080/xpath/save/').subscribe(data => console.log(data));
  // }
  getxpath2(url:string){
  	 var url1 =url.replace('http://','');
     var url1 =url.replace('https://','');
  	 url1=url1+'.';    
     //code lỗi(1) this.http.get('http://localhost:8080/xpath/getxpath2/'+url1).subscribe(data => this.html=data.text());
     //this.http.get('http://localhost:8080/xpath/getxpath2/'+url1).subscribe(data => document.getElementById("show").setAttribute("srcdoc",data.text()));
     let params: URLSearchParams = new URLSearchParams();
     params.set('url', url);
     this.http.post('http://localhost:8080/XPath/getxpath3',{url: url}).subscribe(data => console.log(data));
  }
}
