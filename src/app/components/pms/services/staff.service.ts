import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAllStaff(): Observable<any> {
    return this.http.get(this.url + 'staffs');
  }

  createStaff(data: any): Observable<any> {
    if (data.Admin === '') {
      data.Admin = false;
    }
    return this.http.post(this.url + 'staffs', {
    Title: data.Title,
    FirstName: data.FirstName,
    LastName: data.LastName,
    PhoneNumber: data.PhoneNumber,
    Email: data.Email,
    Address: data.Address,
    Age: data.Age,
    Admin: data.Admin,
    Sex: data.Sex,
    Password: data.Password,
    MaritalStatus: data.MaritalStatus,
    Avatar: data.Avatar,
    Position: data.Position,
    SchoolQualifications: data.SchoolQualifications,
    });
  }

  updateStaff(data: any, id: string): Observable<any> {
    if (data.Admin === '') {
      data.Admin = false;
    }
    return this.http.put(this.url + 'staffs/' + id, {
    Title: data.Title,
    FirstName: data.FirstName,
    LastName: data.LastName,
    PhoneNumber: data.PhoneNumber,
    Email: data.Email,
    Admin: data.Admin,
    Address: data.Address,
    Age: data.Age,
    Sex: data.Sex,
    MaritalStatus: data.MaritalStatus,
    Avatar: data.Avatar,
    Password: data.Password,
    Position: data.Position,
    SchoolQualifications: data.SchoolQualifications,
    });
  }

  deleteStaff(id: string) {
    return this.http.delete(this.url + 'staffs/' + id);
  }
}
