export class EmployeeModel {
  id!: number;
  firstName!: string;
  lastName!: string;
  emailID!: string;
  mobileNo!: string;
  designation!: string;

  constructor(
    firstName: string,
    lastName: string,
    emailID: string,
    mobileNo: string,
    designation: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.emailID = emailID;
    this.mobileNo = mobileNo;
    this.designation = designation;
  }
}
