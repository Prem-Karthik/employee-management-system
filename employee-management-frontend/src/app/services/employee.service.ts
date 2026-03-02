import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:8080/api/employees';

  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  searchByName(name: string) {
  return this.http.get<Employee[]>(
    `${this.apiUrl}/search?name=${name}`
  );
}

filterByDepartment(dept: string) {
  return this.http.get<Employee[]>(
    `${this.apiUrl}/department?dept=${dept}`
  );
}

getEmployeesPaged(page: number, size: number) {
  return this.http.get<any>(
    `${this.apiUrl}/paged?page=${page}&size=${size}`
  );
}
}