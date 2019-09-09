import { StaffService } from './../services/staff.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { PatientsService } from './../services/patients.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
// staffs: Array<any> = [];
patients: Array<any> = [];
patientForm: FormGroup;
pdetails: any;
mysubscription;
filteredDoctor: Array<any> = [];
titles = [{title: 'Dr'}, {title: 'Mr'}, {title: 'Mrs'}, {title: 'Chief'}, {title: 'Hon.'}, {title: 'Master'}, {title: 'Miss'}];
  isValidImage: boolean;
  status: boolean;
  fileErrorMessage: string;
  newPatient = false;
  edit = false;
  viewPatient = false;
  staffs: Array<any> = [];
  staff: any;
  data: any;
  isAdmin: any;
  constructor(
    private patientservice: PatientsService,
    private staffsservice: StaffService,
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
    console.log('admin', this.isAdmin);
    this.loadPatients();
    this.loadDoctors();
    this.patientForm = this.fb.group({
      Title: [''],
      FirstName: [''],
      LastName: [''],
      PhoneNumber: [''],
      Email: [''],
      Address: [''],
      Age: [],
      Sex: [''],
      MaritalStatus: [''],
      Password: [''],
      Avatar: [''],
      PatientState: [''],
      DoctorId: [''],
      Parents: this.fb.array([]),
      _id: ['']
    });
  }


  // method to edit patient details
  editPatient(event: any, i: any) {
    this.viewPatient = false;
    this.edit = true;
    this.filteredDoctor = this.staffs.filter(n => n._id === event.DoctorId);
    event.Parents.forEach(e => {
        const control = this.patientForm.controls.Parents as FormArray;
        control.push(this.fb.group({
                PName: e.PName,
              PAddress: e.PAddress,
              PPhoneNumber: e.PPhoneNumber,
              PEmail: e.PEmail
              }));
      });


    this.patientForm.patchValue({
      Title: event.Title,
      FirstName: event.FirstName,
      LastName: event.LastName,
      PhoneNumber: event.PhoneNumber,
      Email: event.Email,
      Address: event.Address,
      Age: event.Age,
      Sex: event.Sex,
      Password: event.Password,
      MaritalStatus: event.MaritalStatus,
      Avatar: event.Avatar,
      PatientState: event.PatientState,
      DoctorId: event.DoctorId,
      _id: event._id
    });

    // call the method to push into Parent array Form
  }

  // Method to load all staffss
    loadDoctors() {
      this.staffsservice.getAllStaff().subscribe(data => this.staffs = data);
    }
  // Method to get all patients
  loadPatients() {
    this.patientservice.getAllPatients().subscribe(data => this.patients = data);
  }

  // Method to add parent to the arrray inside patient object
  addParents() {
    const control = this.patientForm.controls.Parents as FormArray;
    control.insert(0, this.fb.group({
              PName: [''],
              PAddress: [''],
              PPhoneNumber: [''],
              PEmail: ['']
          }));
  }

  // Method to refresh patient component
  refreshPage() {
    this.viewPatient = false;
    this.router.navigate(['pms/patients']);
  }

  // Method to calll the patient information
callPatient(event: any, id: any) {
  // Filtering the staffs information from patient event
this.filteredDoctor = this.staffs.filter(n => n._id === id);

 // Looping through the filteredDoctor Array
if (this.filteredDoctor.length > 0) {
  for (const staff of this.filteredDoctor) {
    this.staff = staff;
  }
}
this.pdetails = event;
this.viewPatient = true;
}

// Method to call Patient registration form
register() {
  this.viewPatient = true;
  this.edit = true;
  this.newPatient = true;
}

// Method to remove parent array
removeParent(i: number) {
const control = this.patientForm.controls.Parents as FormArray;
control.removeAt(i);
}
// Method to delete Patient
removePatient(event: any) {
  console.log('id', event._id);
  Swal.fire({
    title: 'Do want to delete this patient?',
    text: `Deleting ${event.Title} ${event.FirstName} ${event.LastName} data you cant recover it!`,
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {
      this.patientservice.deletePatient(event._id).subscribe(data => {
        this.data = data;
        Swal.fire(
        'Deleted!',
        ` ${this.data.message}  has been deleted.`,
        'success'
      ).then(() => this.router.navigate(['pms/patients']));
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
    this.patientForm.value.Avatar = result;
    this.status = true;
   };
 } else {
   this.isValidImage = false;
   this.fileErrorMessage = 'Invalid file type. Only image is allowed';
 }
  reader.readAsDataURL(file);
 }

 // Method to Submit the form
  onSubmit(formValue: any) {
    if (formValue._id !== '') {
     this.patientservice.updatePatient(formValue, formValue._id).subscribe(data => {
      this.snackBar.open(`${data.message}`, 'Close', {
        duration: 3000,
      });
      this.router.navigate(['pms/patients']);
     }, catchError => this.snackBar.open(`${catchError.error.message}`, 'Close', {
      duration: 3000,
    }));
   } else {
    this.patientservice.createPatient(formValue).subscribe(data => {

      this.snackBar.open(`${data.message}`, 'Close', {
        duration: 3000,
      });
      this.router.navigate(['pms/patients']);
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
