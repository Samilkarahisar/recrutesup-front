import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }


  getImageById(id){
    if(this.http.get("http://betshare.app/recrutesup/image-"+id+".png") ){
      return "http://betshare.app/recrutesup/image-"+id+".png";
    
    }else{
      return "http://betshare.app/recrutesup/image-default.png";
    }
  }
}
