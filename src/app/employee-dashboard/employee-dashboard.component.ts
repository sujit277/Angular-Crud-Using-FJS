import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeeModel } from '../modal/employee-dashboard.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  EmployeeModelobj = new EmployeeModel('', '', '', '', '');
  Employeedata: any;

  constructor(private api: ApiService) {}

  Addform = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    emailID: new FormControl(''),
    mobileNo: new FormControl(''),
    designation: new FormControl(''),
  });

  ngOnInit(): void {
    this.getAllEmployee();
  }

  /* Method for Adding Records */
  postEmployeeDetails() {
    this.EmployeeModelobj = new EmployeeModel(
      this.Addform.value.firstName,
      this.Addform.value.lastName,
      this.Addform.value.emailID,
      this.Addform.value.mobileNo,
      this.Addform.value.designation
    );
    this.api.postEmployee(this.EmployeeModelobj).subscribe(() => {
      alert('Data Added Successfully');
      this.Addform.reset();
      this.getAllEmployee();
    });
  }

  /*  Method for Getting Records */
  getAllEmployee() {
    this.api.getEmployee().subscribe((data) => {
      this.Employeedata = data;
    });
  }

  /* Method For Deleting Records */
  delEmployee(data: any) {
    this.api.deleteEmployee(data.id).subscribe(() => {
      alert('Data Deleted Successfully');
      this.getAllEmployee();
    });
  }

  /* Method for Filling Modal form on Click of Edit Button */
  onEdit(row: any) {
    this.EmployeeModelobj.id = row.id;
    this.Addform.controls['firstName'].setValue(row.firstName);
    this.Addform.controls['lastName'].setValue(row.lastName);
    this.Addform.controls['emailID'].setValue(row.emailID);
    this.Addform.controls['mobileNo'].setValue(row.mobileNo);
    this.Addform.controls['designation'].setValue(row.designation);
  }

  /* Method for Updating Records */
  updateEmployeeDetails() {
    this.EmployeeModelobj.firstName = this.Addform.value.firstName;
    this.EmployeeModelobj.lastName = this.Addform.value.lastName;
    this.EmployeeModelobj.emailID = this.Addform.value.emailID;
    this.EmployeeModelobj.mobileNo = this.Addform.value.mobileNo;
    this.EmployeeModelobj.designation = this.Addform.value.designation;
    this.api
      .updateEmployee(this.EmployeeModelobj, this.EmployeeModelobj.id)
      .subscribe(() => {
        alert('Data Updated Successfully');
        this.Addform.reset();
        this.getAllEmployee();
      });
  }
}
