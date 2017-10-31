import { Component,ViewChild } from "@angular/core";
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/toPromise';
import {HttpParams} from '@angular/common/http';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { TabsetComponent } from 'ngx-bootstrap';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'
  ],
})
export class AppComponent {
	constructor(private http:Http){}
  title = 'Welcome to XPATH Getting Application!';
  date:Date;
  status:boolean = false;
  colorTheme = 'theme-dark-blue';
  bsConfig: Partial<BsDatepickerConfig> = Object.assign({}, {containerClass: this.colorTheme});
  @ViewChild(ModalDirective) public modal: ModalDirective;
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  
  // getxpath(url:string){
    // 	 var url1 =url.replace('http://','');
    // 	 url1=url1+'.';
    //    this.http.get('http://localhost:8080/xpath/getxpath/'+url1).subscribe(data => console.log(data));
    // }
    // savexpath(){
      //   if(this.http.get('http://localhost:8080/xpath/save/')){
        //       alert("lưu thành công")
        //   }else alert("lưu không thành công");
        // }

        savexpath(){
          this.status=false;
          console.log(this.status);
          this.http.get('http://localhost:8080/xpath/save/').subscribe(data=>document.getElementById("labelMessage").innerHTML=data.text());
          document.getElementById("btnsavexpath").setAttribute("disabled","disabled");
          document.getElementById("btnsavexpath").style.backgroundColor = "gray";
        }

        async showxpath(url:string){
          if(this.checkurl(url)){
              let html="";
              await this.getxpath(url).then(value=>html=value.text() );
              if(html!=""){
                document.getElementById("show").setAttribute("srcdoc",html);
                this.status=true;
                this.success();
              }else {document.getElementById("show").setAttribute("srcdoc","<h1>Error 404: Not Found<h1>");
                this.status=false;
                this.fail();
              }
            this.urlvalid();
          }else{
            this.status=false; 
            console.log(this.status);
            this.urlnotvalid();
            this.fail();
          }

          // var url1 =url.replace('http://','');
          // var url1 =url.replace('https://','');
          // url1=url1+'.';    
          //code lỗi(1) this.http.get('http://localhost:8080/xpath/getxpath2/'+url1).subscribe(data => this.html=data.text());
          //this.http.get('http://localhost:8080/xpath/getxpath2/'+url1).subscribe(data => document.getElementById("show").setAttribute("srcdoc",data.text()));
          // let params: URLSearchParams = new URLSearchParams();
          // params.set('url', url);
          // this.http.get('http://localhost:8080/xpath/getxpath3', {search: params}).subscribe(data => document.getElementById("show").setAttribute("srcdoc",data.text()));

        }

        // getoldxpath(url:string,date:string){
        //   let params: URLSearchParams = new URLSearchParams();
        //   params.set('url', url);
        //   params.set('date', date);
        //   this.http.get('http://localhost:8080/xpath/getoldxpath/',{search: params}).subscribe(data=>document.getElementById("show").setAttribute("srcdoc",data.text()));
        // }
        checkurl(url:string){
          if(url.length>0){
            return true;
          } else return false;
        }

        getxpath(url:string){ 
          let cpHeadears = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: cpHeadears});
          return this.http.post('http://localhost:8080/xpath/getxpath4',url,options).toPromise();
        }

        urlnotvalid(){
          document.getElementById("url").focus();
          document.getElementById("divError").style.display="block";
          document.getElementById("url").style.borderColor="red";
          document.getElementById("show").style.border="none";
          document.getElementById("show").setAttribute("srcdoc","");
          document.getElementById("labelMessage").innerHTML="";
          document.getElementById("show").style.background="#f0f0f0";
        }
        urlvalid(){
          document.getElementById("show").style.background="white";
          document.getElementById("show").style.border="ridge";
          document.getElementById("labelMessage").innerHTML="";
        }
        fail(){
          document.getElementById("savexpath").style.display="none";
          document.getElementById("show").style.background="#f0f0f0";
        }
        success(){
          document.getElementById("savexpath").style.display="inline";
        }

        changeTab(){
          if(this.status){
            this.modal.show();
          }
        }

        cancel(){
          this.staticTabs.tabs[0].active = true;
          this.modal.hide();
        }

        validate(url:string)
        {
          var pattern = new RegExp('^((https?:)?\\/\\/)'+ // protocol
              '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
              '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
              '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
              '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
              '(\\#[-a-z\\d_]*)?$','i'); // fragment locater
          if(url!=""){
            if(pattern.test(url)) {
               document.getElementById('btngetxpath').removeAttribute("disabled");
               document.getElementById("divError").style.display="none";
               document.getElementById("url").style.borderColor="green";
            } else{
               document.getElementById("divError").innerText="URL is not valid!";
               document.getElementById('btngetxpath').setAttribute("disabled","disabled");
               document.getElementById("divError").style.display="block";
               document.getElementById("url").style.borderColor="red";
               }
           } else{
              document.getElementById('btngetxpath').setAttribute("disabled","disabled");
              document.getElementById("divError").style.display="block";
              document.getElementById("divError").innerText="URL is required!";
              document.getElementById("url").style.borderColor="red";
             }
        }
  }
