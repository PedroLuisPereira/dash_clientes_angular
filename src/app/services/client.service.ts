import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/Client';

/**
 * Decorador
 */
@Injectable({
  providedIn: 'root'
})

export class ClientService {

  apiurl = 'http://localhost:8080/api/clients';

  constructor(private http: HttpClient) { }

  listAll(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiurl}`);
  }

  listById(id: String): Observable<Client> {
    return this.http.get<Client>(`${this.apiurl}/${id}`);
  }

  create(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiurl}`, client);
  }

  update(id: string, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiurl}/${id}`, client);
  }

  delete(id: String): Observable<any> {
    return this.http.delete(`${this.apiurl}/${id}`);
  }
}

