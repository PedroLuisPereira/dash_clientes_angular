import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient } from '../models/Client';

/**
 * Decorador
 */
@Injectable({
  providedIn: 'root'
})

export class ClientService {

  apiurl = 'http://localhost:8080/clients';

  constructor(private http: HttpClient) { }

  listAll(): Observable<IClient[]> {
    return this.http.get<IClient[]>(`${this.apiurl}`);
  }

  listById(id: String): Observable<IClient> {
    return this.http.get<IClient>(`${this.apiurl}/${id}`);
  }

  create(employee: any): Observable<any> {
    return this.http.post(`${this.apiurl}`, employee);
  }

  update(id: String, employee: any): Observable<any> {
    return this.http.put(`${this.apiurl}/${id}`, employee);
  }

  delete(id: String): Observable<any> {
    return this.http.delete(`${this.apiurl}/${id}`);
  }
}

