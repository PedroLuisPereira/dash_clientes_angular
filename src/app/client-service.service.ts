import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {


  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = "http://localhost:8080/clients";
  }


  /**
   * Listar todos los registros
   */
  listAll() {
    return this.http.get(this.apiUrl);
  }
}
