import { Component, inject, signal } from '@angular/core';
import { Employee } from '../../model/class/Employee';
import { Observable } from 'rxjs';
import { MasterService } from '../../service/master.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { IProject, IProjectEmployee } from '../../model/interface/master';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-employee',
  standalone: true,
  imports: [AsyncPipe,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './project-employee.component.html',
  styleUrl: './project-employee.component.css'
})
export class ProjectEmployeeComponent {

  projectForm: FormGroup = new FormGroup({})

  empList$: Observable<Employee[]> = new Observable<[]>
  projList$: Observable<IProject[]> = new Observable<[]>
  // projectList$: Observable<IProject[]> = new Observable<IProject[]>

  projectEmp= signal<IProjectEmployee[]>([])
  masterSrv= inject(MasterService)

  projectNameMap: { [key: number]: string } = {};
  employeeNameMap: {[key: number]: string}={};

  constructor(){
    this.empList$ = this.masterSrv.getAllEmp()
    this.projList$ =this.masterSrv.getAllProject()
    this.Form()
    this.getEmpProj()

    this.projList$.subscribe((projects: IProject[]) => {
      projects.forEach(project => {
        this.projectNameMap[project.projectId] = project.projectName;
        // console.log('Project Name Map:', this.projectNameMap);
      });
    });
    // Populate employeeNameMap
    this.empList$.subscribe((employees: Employee[]) => {
      employees.forEach(employee => {
        this.employeeNameMap[employee.employeeId] = employee.employeeName;
      });
      // console.log('Employee Name Map:', this.employeeNameMap);
    });
  }

  

  Form(){
    this.projectForm=new FormGroup({
      empProjectId: new FormControl(0),
      projectId: new FormControl(0),
      empId: new FormControl(0),
      assignedDate: new FormControl(''),
      role: new FormControl(''),
      // isActive: new FormControl('')
    })
  }

  getEmpProj(){
      this.masterSrv.getAllEmpProject().subscribe((Res: IProjectEmployee[])=>{
        this.projectEmp.set(Res)
      })
  }

  onSaveProjEmp(){
    console.log("onSaveProjEmp called"); // First line in the function
    const formvalue= this.projectForm.value
    console.log(formvalue)
    this.masterSrv.saveEmpProject(formvalue).subscribe((res:IProjectEmployee)=>{
     alert("employee created")
     this.projectForm.reset({ empProjectId: 0 }); // Reset form and set projectId to 0
    // this.isFormVisiable.set(false);
    // this.getProjects()
   },error=>{
    console.error('API Error:', error); // Detailed error message
    alert('API Error')
   })
  }

  onEdit(id: number){
    let isEdit = confirm('Are you sure you want to edit?');
    if (isEdit) { 
      this.masterSrv.editEmpProject(id).subscribe((res:IProjectEmployee) => {
          this.projectForm.patchValue({
            empProjectId: res.empProjectId,
            projectId: res.projectId,
            empId: res.empId,
            assignedDate: res.assignedDate,
            role: res.role,
            // isActive: res.isActive
          });

          // this.isFormVisiable.set(true); // Show the form
        },
        (error) => {
          alert('API Error');
        }
      );
    }
  }
  onDelete(id: number){

  }

}
