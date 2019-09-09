import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAllPatients(): Observable<any>  {
    return this.http.get(this.url + 'patients');
  }

  getSinglePatient(id: string): Observable<any> {
    return this.http.get(this.url + 'patients/' + id);
  }
  createPatient(data: any): Observable<any> {

    return this.http.post(this.url + 'patients', {
      Title: data.Title,
      FirstName: data.FirstName,
      LastName: data.LastName,
      PhoneNumber: data.PhoneNumber,
      Email: data.Email,
      Address: data.Address,
      Age: data.Age,
      Sex: data.Sex,
      MaritalStatus: data.MaritalStatus,
      Avatar: data.Avatar,
      Password: data.Password,
      PatientState: data.PatientState,
      DoctorId: data.DoctorId,
      Parents: data.Parents
    });
    }

  updatePatient(data: any, id: string): Observable<any> {
    return this.http.put(this.url + 'patients/' + id, {
    Title: data.Title,
    FirstName: data.FirstName,
    LastName: data.LastName,
    PhoneNumber: data.PhoneNumber,
    Email: data.Email,
    Address: data.Address,
    Age: data.Age,
    Sex: data.Sex,
    MaritalStatus: data.MaritalStatus,
    Avatar: data.Avatar,
    Password: data.Password,
    PatientState: data.PatientState,
    DoctorId: data.DoctorId,
    Parents: data.Parents
   });
  }

  deletePatient(id: string) {
    return this.http.delete(this.url + 'patients/' + id);
  }
}
