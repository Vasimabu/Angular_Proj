export class Employee {
    employeeId: number;
    employeeName: string;
    contactNo: string;
    emailId: string;
    deptId: number;
    password: string;
    gender: string;
    role: string;
    createdDate: string;
  
    constructor() {
      this.employeeId = 0;
      this.employeeName = '';
      this.contactNo = '';
      this.emailId = '';
      this.deptId = 0;
      this.password = '';
      this.gender = '';
      this.role = '';
      // Setting a default createdDate with the current date in ISO format
      this.createdDate = new Date().toISOString();
    }
  }

  