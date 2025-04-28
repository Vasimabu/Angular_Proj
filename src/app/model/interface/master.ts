export interface IApiResponse{
    message: string;
    result: boolean;
    data: any;
}

export interface IParentDept{
    departmentId:number; 
    departmentName: string;
    departmentLogo: string;
}

export interface IChildDept{
    childDeptId: number;
    parentDeptId: number,
    departmentName: string;
}

export interface IProjectEmployee{
    empProjectId: number,
    projectId: number,
    empId: number,
    assignedDate: string,
    role: string,
    isActive: string
}

export interface IProject{
  projectId: number,
  projectName: string,
  clientName: string,
  startDate: string,
  leadByEmpId: number,
  contactPerson: string,
  contactNo: string,
  emailId: string
}
export interface IEarnedLeave{
    // data: IEarnedLeave[]; // The array of earned leave data
    earnedLeaveId: number,
    employeeId: number,
    totalEarnedLeaves: number,
    totalSickEarnedLeaves: number,
    lastUpdatedDate:string
}
export interface IEarnedLeaveResponse {
    data: IEarnedLeave[]; // The array of earned leave records
    message?: string;
    result?: boolean;
  }
export interface Ileavetype{
   leaveTypeId: number,
   typeName: string
}
export interface Ileavetyperes{
    data: Ileavetype[]; // The array of earned leave records
    message?: string;
    result?: boolean;
}
export interface Ileavereq{
    leaveId: number,
    employeeId: number,
    leaveTypeId: number,
    startDate: string,
    endDate: string,
    status: string,
    reason: string,
    requestDate: string,
    employeeName: string,
    contactNo: string,
    typeName: string
}
export interface Ileavereqres{
    data: Ileavereq[]; // The array of earned leave records
    message?: string;
    result?: boolean;
}