import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data;

  constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http.get(url);
  }

  getAll() {
    return [
      { id: 'assets/data-set.json', name: 'test' }
    ];
  }

  setValue(value) {
    this.data = value;
  }

  getValue() {
    return this.data;
  }

}
