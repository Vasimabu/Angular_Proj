import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse, IEarnedLeave, IEarnedLeaveResponse, Ileavereq, Ileavereqres, Ileavetyperes, IProject, IProjectEmployee } from '../model/interface/master';
import { Employee } from '../model/class/Employee';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  apiUrl: string= "https://projectapi.gerasim.in/api/EmployeeManagement/"
  constructor(private http: HttpClient) { }

  
  getAllDept(): Observable<IApiResponse>{
    return this.http.get<IApiResponse>(this.apiUrl + "GetParentDepartment")
  }

  getChildDeptById(depid: number): Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${this.apiUrl}GetChildDepartmentByParentId?depId=${depid}`)
  }

  saveEmp(obj: Employee): Observable<IApiResponse>{
    debugger;
    return this.http.post<IApiResponse>(this.apiUrl + "CreateEmployee", obj)
  }

  getAllEmp(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiUrl + "GetAllEmployees")
  }

  delEmp(id: number): Observable<IApiResponse>{
    return this.http.delete<IApiResponse>(`${this.apiUrl}DeleteEmployee/${id}`)
  }
  updateEmp(obj: Employee): Observable<IApiResponse>{
    debugger;
    return this.http.put<IApiResponse>(this.apiUrl + "CreateEmployee/"+obj.employeeId, obj)
  }

  saveProject(obj: Employee): Observable<IProject>{
    debugger;
    return this.http.post<IProject>(this.apiUrl + "CreateProject", obj)
  }

  getAllProject(): Observable<IProject[]>{
    return this.http.get<IProject[]>(this.apiUrl + "GetAllProjects")
  }
  editProj(id: number): Observable<IProject>{
    debugger;
    return this.http.get<IProject>(this.apiUrl + "GetProject/"+id)
  }

  delProj(id: number): Observable<IProject[]>{
    return this.http.delete<IProject[]>(`${this.apiUrl}DeleteProject/${id}`)
  }

  updateProj(id: number, updatedProject: IProject): Observable<IProject> {
    return this.http.put<IProject>(this.apiUrl + "UpdateProject/" + id, updatedProject);
  }

  getAllEmpProject(): Observable<IProjectEmployee[]>{
    return this.http.get<IProjectEmployee[]>(this.apiUrl + "GetAllProjectEmployees")
  }
  editEmpProject(id: number): Observable<IProjectEmployee>{
    return this.http.get<IProjectEmployee>(this.apiUrl + "GetProjectEmployee/"+id )
  }
  saveEmpProject(obj: Employee): Observable<IProjectEmployee>{
    debugger;
    return this.http.post<IProjectEmployee>(this.apiUrl + "CreateProjectEmployee", obj)
  }
  getDashbvaordData(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "GetDashboard");
  }
  getEmpLeaveDashboard():Observable<any>{
    return this.http.get<any>(this.apiUrl+ "GetEmpployeeLeaveDashboard")
  }
  getAllEarnedleave(): Observable<IEarnedLeaveResponse> {
    return this.http.get<IEarnedLeaveResponse>(this.apiUrl + "GetAllEarnedLeaves");
  }
  saveEarnedleave(obj: IEarnedLeave): Observable<IEarnedLeaveResponse>{
    debugger;
    return this.http.post<IEarnedLeaveResponse>(this.apiUrl + "AddNewEarnedLeave", obj)
  }
  editEarnedLeave(id: number): Observable<IEarnedLeaveResponse[]>{
    return this.http.get<IEarnedLeaveResponse[]>(`${this.apiUrl}GetEarnedLeavesByEmpId?id=${id}`)
  }
  delEarnedleave(id: number): Observable<IEarnedLeave[]>{
    return this.http.delete<IEarnedLeave[]>(`${this.apiUrl}DeleteEarnedLeave?earnedLeaveId=${id}`)
  }
  getAllLeavetype(): Observable<Ileavetyperes>{
    return this.http.get<Ileavetyperes>(this.apiUrl+ "GetLeaveTypes")
  }
  getAllLeavereq(): Observable<Ileavereqres>{
    return this.http.get<Ileavereqres>(this.apiUrl+ "GetAllLeaveRequest")
  }
  saveleavereq(obj: Ileavereq): Observable<Ileavereqres>{
    debugger;
    return this.http.post<Ileavereqres>(this.apiUrl + "CreateNewLeaveRequest", obj)
  }
  
}