import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) }

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private domain = "https://localhost:7208"; // need to create a environment varaible

  constructor(private http: HttpClient) { }


  public getAllEmployee() {
    const strUrl = `${this.domain}/api/Employee/GetAllEmp`;
    return this.http.get(strUrl, httpOptions);
  }

  public getEmployeeById(id: number) {
    const strUrl = `${this.domain}/api/Employee/GetEmp?id=${id}`
    return this.http.get(strUrl, httpOptions);
  }

  public AddEmployee(modal: any) {
    const strUr = `${this.domain}/api/Employee/AddEmp`;
    return this.http.post(strUr, modal, httpOptions);
  }

  public EditEmployee(modal: any) {
    const strUrl = `${this.domain}/api/Employee/EditEmp`;
    return this.http.put(strUrl, modal, httpOptions)
  }

  public DeleteEmployee(id: number) {
    const strUrl = `${this.domain}/api/Employee/DeleteEmp?id=${id}`
    return this.http.delete(strUrl, httpOptions);
  }
}