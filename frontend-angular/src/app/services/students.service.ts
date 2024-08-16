import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Payment, Students} from "../model/students.model";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http:  HttpClient) { }

  public getAllPayements():Observable<Array<Payment>>{
    return this.http.get<Array<Payment>>(`${environment.backendHost}/payments`);
  }

  public getStudents():Observable<Array<Students>>{
    return this.http.get<Array<Students>>(`${environment.backendHost}/students`);
  }
  public getStudentsPayments(code:string):Observable<Array<Payment>>{
    return this.http.get<Array<Payment>>(`${environment.backendHost}/students/${code}/payments`);
  }

  public savepayments(formData:any):Observable<Payment>{
    return this.http.post<Payment>(`${environment.backendHost}/payments`,formData);
  }

  getPaymentDetails(paymentId: number) {
    return this.http.get(`${environment.backendHost}/payments/${paymentId}/file`,{responseType:'blob'})

  }
}
