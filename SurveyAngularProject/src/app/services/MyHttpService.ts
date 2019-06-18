import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyHttpServiceService {

  private baseUrl: string = "http://localhost:3000/";

  constructor(private client: HttpClient) { }

  get(path: string) {
    return this.client.get(this.baseUrl + path);
  };

  post(path: string, body: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.client.post(this.baseUrl + path, body, {headers: headers});
  }

  put(path: string, body: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.client.put(this.baseUrl + path, body, {headers: headers});
  }

  delete(path: string) {
    return this.client.delete(this.baseUrl + path);
  }

}
