import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { EmployeeModel } from "../modal/employee-dashboard.model";
import { ApiService } from "../services/api.service";

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  EmployeeModelobj !: EmployeeModel;
  Employeedata: any;
  firstName = "";
  lastName = "";
  emailID = "";
  mobileNo = "";
  designation = "";

  constructor(private api: ApiService) { }

  Addform = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    emailID: new FormControl(''),
    mobileNo: new FormControl(''),
    designation: new FormControl('')
  });

  ngOnInit(): void {
    this.getAllEmployee();
  }

  /* Method for Adding Records */
  postEmployeeDetails() {
    this.firstName = this.Addform.value.firstName;
    this.lastName = this.Addform.value.lastName;
    this.emailID = this.Addform.value.emailID;
    this.mobileNo = this.Addform.value.mobileNo;
    this.designation = this.Addform.value.designation;
    this.EmployeeModelobj = new EmployeeModel(this.firstName, this.lastName, this.emailID, this.mobileNo, this.designation);
    this.api.postEmployee(this.EmployeeModelobj)
      .subscribe(res => {
        alert("Data Added Successfully")
        this.Addform.reset();
        this.getAllEmployee();
      })
  }


  /*  Method for Getting Records */
  getAllEmployee() {
    this.api.getEmployee()
      .subscribe(res => {
        this.Employeedata = res;
      })
  }


  /* Method For Deleting Records */
  delEmployee(row: any) {
    this.api.deleteEmployee(row.id)
      .subscribe(res => {
        alert("Data Deleted Successfully")
        this.getAllEmployee();
      })
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
    this.api.updateEmployee(this.EmployeeModelobj, this.EmployeeModelobj.id)
      .subscribe(res => {
        alert("Data Updated Successfully");
        this.Addform.reset();
        this.getAllEmployee();
      })
  }
}
