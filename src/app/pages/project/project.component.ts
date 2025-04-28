import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { Observable } from 'rxjs';
import { Employee } from '../../model/class/Employee';
import { AsyncPipe } from '@angular/common';
import { IProject } from '../../model/interface/master';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,AsyncPipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  isFormVisiable = signal<boolean>(false)
  projectForm: FormGroup = new FormGroup({})

  empList$: Observable<Employee[]> = new Observable<[]>
  projectList: IProject[]=[]
  masterSrv= inject(MasterService)
  router = inject(Router)

  constructor(){
    this.empList$ = this.masterSrv.getAllEmp()
    this.initializeForm()
    this.getProjects()
  }

  initializeForm(){
    this.projectForm=new FormGroup({
      projectId: new FormControl(0),
      projectName: new FormControl(''),
      clientName: new FormControl(''),
      startDate: new FormControl(''),
      leadByEmpId: new FormControl(0),
      contactPerson: new FormControl(''),
      contactNo: new FormControl(''),
      emailId: new FormControl('')
    })
  }

  getProjects(){
    this.masterSrv.getAllProject().subscribe((Res: IProject[])=>{
      this.projectList = Res;
    })
  }
  onSaveProject(){
    const formValue = this.projectForm.value;
   this.masterSrv.saveProject(formValue).subscribe((res:IProject)=>{
     alert("employee created")
     this.projectForm.reset({ projectId: 0 }); // Reset form and set projectId to 0
    this.isFormVisiable.set(false);
    this.getProjects()
   },error=>{
    alert('API Error')
   }) 
  }


  onEdit(id: number) {
    let isEdit = confirm('Are you sure you want to edit?');
    if (isEdit) {
      this.masterSrv.editProj(id).subscribe((res:IProject) => {
          // Patch the form with the retrieved project data
          this.projectForm.patchValue({
            projectId: res.projectId,
            projectName: res.projectName,
            clientName: res.clientName,
            startDate: res.startDate,
            leadByEmpId: res.leadByEmpId,
            contactPerson: res.contactPerson,
            contactNo: res.contactNo,
            emailId: res.emailId,
          });

          this.isFormVisiable.set(true); // Show the form
        },
        (error) => {
          alert('API Error');
        }
      );
    }
  }
  onProjUpdate(id: number) {
    debugger;
    const updatedProject = this.projectForm.value; // Get the updated project data from the form
    this.masterSrv.updateProj(id, updatedProject).subscribe((res: IProject) => {
      alert("Project updated successfully");
      this.getProjects(); // Refresh the project list after update
      this.isFormVisiable.set(false);
      this.projectForm.reset({ projectId: 0 }); // Reset form and set projectId to 0
    }, error => {
      alert("API Error");
    });
  }

  onDelete(id: number){
    let isDelete= confirm("are you sure want to delete");
     if(isDelete){
      this.masterSrv.delProj(id).subscribe((res:IProject[])=>{
        alert("Successfully Delete")
        this.getProjects()
      },error=>{
        alert("API Error")
      }) 
     }
  }


}
