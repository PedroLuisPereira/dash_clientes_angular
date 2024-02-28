import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, IClient } from '../models/Client';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  apiurl = 'http://localhost:8080/clients';

  constructor(private http: HttpClient) { }

  getAllEmployee(): Observable<IClient[]> {
    return this.http.get<IClient[]>(`${this.apiurl}`);
  }

  getEmployee(id: string): Observable<ApiResponse<IClient>> {
    return this.http.get<ApiResponse<IClient>>(`${this.apiurl}/${id}`);
  }

  createEmployee(employee: IClient): Observable<any> {
    return this.http.post(`${this.apiurl}`, employee);
  }

  updateEmployee(id: string, employee: IClient): Observable<any> {
    return this.http.put(`${this.apiurl}/${id}`, employee);
  }

  deleteEmployee(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiurl}/${id}`);
  }
}

