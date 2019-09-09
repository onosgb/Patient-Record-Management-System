import { Component, OnInit } from '@angular/core';
import { StaffService } from '../services/staff.service';
import { Router, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { PatientsService } from '../services/patients.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  filteredStaff: Array<any> = [];
  titles = [{title: 'Dr'}, {title: 'Mr'}, {title: 'Mrs'}, {title: 'Chief'}, {title: 'Hon.'}, {title: 'Master'}, {title: 'Miss'}];
  positions = [
    {PositionName: 'Senior Doctor'},
    {PositionName: 'Junior Doctor'},
    {PositionName: 'Cleaner'},
    {PositionName: 'Junior Nurse'},
    {PositionName: 'Junior Doctor'},
  ];

  staffForm: FormGroup;
  mysubscription;
  isValidImage: boolean;
  status: boolean;
  fileErrorMessage: string;
  newStaff = false;
  edit = false;
  viewStaff = false;
  staffs: Array<any> = [];
  staff: any;
  data: any;
  sdetails: any;
  isAdmin: any;
  userid: any;
  constructor(
    private staffservice: StaffService,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
     ) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => {
        return false;
      };
      this.mysubscription  = this.router.events.subscribe((event)  =>  {
        if (event instanceof NavigationEnd) {
          this.router.navigated = false;
        }
      });
     }

  ngOnInit() {
    this.isAdmin = localStorage.getItem('isAdmin');
    this.userid = localStorage.getItem('userid');
    this.loadStaff();
    this.staffForm = this.fb.group({
    Title: [''],
    FirstName: [''],
    LastName: [''],
    PhoneNumber: [''],
    Email: [''],
    Address: [''],
    Age: [],
    Sex: [''],
    MaritalStatus: [''],
    Admin: [''],
    Password: [''],
    Avatar: [''],
    Position: [''],
    SchoolQualifications: this.fb.array([]),
    _id: ['']
   });
}



  // method to edit patient details
  editStaff(event: any, i: any) {
    this.viewStaff = false;
    this.edit = true;

// tslint:disable-next-line: triple-equals
    this.filteredStaff = this.staffs.filter(n => n._id === event._id);

    this.staffForm.patchValue(event);
    event.SchoolQualifications.forEach(e => {
        const control = this.staffForm.controls.SchoolQualifications as FormArray;
        control.push(this.fb.group({
              SchoolName: e.SchoolName,
              YearOfEntry: e.YearOfEntry,
              YearOfGraduation: e.YearOfGraduation,
              CertificateName: e.CertificateName
              }));
      });


  }


  // Method to load all staffs
    loadStaff() {
      this.staffservice.getAllStaff().subscribe(data => this.staffs = data);
    }

  // Method to add staff to the arrray inside patient object
  addStaff() {
    const control = this.staffForm.controls.SchoolQualifications as FormArray;
    control.insert(0, this.fb.group({
      SchoolName: [''],
      YearOfEntry: [''],
      YearOfGraduation: [''],
      CertificateName: ['']
          }));
  }

  // Method to refresh patient component
  refreshPage() {
    this.viewStaff = false;
    this.router.navigate(['pms/staff']);
  }

  // Method to calll the staff information
callStaff(event: any, id: any) {
  // Filtering the staff information from patient event
this.filteredStaff = this.staffs.filter(n => n._id === id);

 // Looping through the filteredStaff Array
if (this.filteredStaff.length > 0) {
  for (const staff of this.filteredStaff) {
    this.staff = staff;
  }
}
this.sdetails = event;
this.viewStaff = true;
}

// Method to call Patient registration form
register() {
  this.viewStaff = true;
  this.edit = true;
  this.newStaff = true;
}

// Method to remove staff array
removeSQl(i: number) {
const control = this.staffForm.controls.SchoolQualifications as FormArray;
control.removeAt(i);
}
// Method to delete Patient
removeStaff(event: any) {
  console.log('id', event.id);
  Swal.fire({
    title: 'Do want to delete this Staff?',
    text: `Deleting ${event.Title} ${event.FirstName} ${event.LastName} data you cant recover it!`,
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {
      this.staffservice.deleteStaff(event._id).subscribe(data => {
        this.data = data;
        Swal.fire(
        'Deleted!',
        ` ${this.data.message}  has been deleted.`,
        'success'
      ).then(() => this.router.navigate(['pms/staff']));
      }, catchError => {});

    } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Thank You!',
          `${event.Title} ${event.FirstName} ${event.LastName} data is safe!`,
          'error'
        );
      }
    });
  }

// Method for image upload
pickPix(event: Event ) {
  // this.memberForm.value.Avatar = null;
  const file = (event.target as HTMLInputElement).files[0];
  const reader = new FileReader();
  if (file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png') {
   this.isValidImage = true;
   reader.onload = (e) => {
// tslint:disable-next-line: no-string-literal
    const result = e.target['result'];
    this.staffForm.value.Avatar = result;
    this.status = true;
   };
 } else {
   this.isValidImage = false;
   this.fileErrorMessage = 'Invalid file type. Only image is allowed';
 }
  reader.readAsDataURL(file);
 }

 // Method to format date
 formatDate(date: any) {
   return moment(date).format('DD-MM-YYYY');
 }
 // Method to Submit the form
  onSubmit(formValue: any) {
    // console.log('formValue', formValue);
    if (formValue._id !== '') {
     this.staffservice.updateStaff(formValue, formValue._id).subscribe(data => {
      this.snackBar.open(`${data.message}`, 'Close', {
        duration: 3000,
      });
      this.router.navigate(['pms/staff']);
     }, catchError => this.snackBar.open(`${catchError.error.message}`, 'Close', {
      duration: 3000,
    }));
   } else {
    this.staffservice.createStaff(formValue).subscribe(data => {
      this.snackBar.open(`${data.message}`, 'Close', {
        duration: 3000,
      });
      this.router.navigate(['pms/staff']);
    }, catchError => this.snackBar.open(`${catchError.error.message}`, 'Close', {
      duration: 3000,
    })
    );
   }
  }

// tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {
    if (this.mysubscription) {
      this.mysubscription.unsubscribe();
    }
  }
}
