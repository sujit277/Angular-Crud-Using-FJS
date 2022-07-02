import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
 
  /* Post API Request*/
  postEmployee(data:any){
    console.log(data);
    return this.http.post("http://localhost:3000/posts",data)  
  }

  /* Get API Request  */
  getEmployee(){
    return this.http.get("http://localhost:3000/posts") 
  }

  /* Put API Request */
  updateEmployee(data:any,id:number){
    return this.http.put("http://localhost:3000/posts/"+id,data)
  }
  
  /* Delete API Request */
  deleteEmployee(id:number){
    return this.http.delete("http://localhost:3000/posts/"+id)
  }
}
