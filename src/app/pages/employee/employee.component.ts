import { Component, inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { IApiResponse, IChildDept, IParentDept } from '../../model/interface/master';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../model/class/Employee';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  isFormVisiable = signal<boolean>(false)
  masterSrv=inject(MasterService)
  parentDepList= signal<IParentDept[]>([])
  employeeList= signal<Employee[]>([])
  childDepList= signal<IChildDept[]>([])
  parentDepId: number=0;
  employeeObj: Employee= new Employee()

  ngOnInit(): void {
    this.getParentDept()
    this.getEmployees()
  }
  getParentDept(){
    this.masterSrv.getAllDept().subscribe((res:IApiResponse)=>{
      this.parentDepList.set(res.data)
    })
  }
  getEmployees(){
    this.masterSrv.getAllEmp().subscribe((res:Employee[])=>{
      this.employeeList.set(res)
    })
  }

  onParentDepChange(){
    this.masterSrv.getChildDeptById(this.parentDepId).subscribe((Res: IApiResponse)=>{
      this.childDepList.set(Res.data)
    })
  }
  onSave(){
    debugger;
   this.masterSrv.saveEmp(this.employeeObj).subscribe((res:IApiResponse)=>{
     alert("employee created")
     this.getEmployees()
     this.employeeObj=new Employee()
   },error=>{
    alert('API Error')
   }) 
  }
  onEdit(data: Employee){
    this.employeeObj=data;
    this.isFormVisiable.set(true)
  }
  onDelete(id: number){
     let isDelete= confirm("are you sure want to delete");
     if(isDelete){
      debugger;
      this.masterSrv.delEmp(id).subscribe((res:IApiResponse)=>{
        alert("Successfully Delete")
        this.getEmployees()
      },error=>{
        alert("API Error")
      }) 
     }
  }
  onUpdate(){
    debugger;
   this.masterSrv.updateEmp(this.employeeObj).subscribe((res:IApiResponse)=>{
     alert("employee update")
     this.getEmployees()
     this.employeeObj=new Employee()

   },error=>{
    alert("API Error")
   }) 
  }
}
