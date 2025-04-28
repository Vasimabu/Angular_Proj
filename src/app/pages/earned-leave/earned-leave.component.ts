import { Component, inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { IEarnedLeave, IEarnedLeaveResponse } from '../../model/interface/master';
import { Observable } from 'rxjs';
import { Employee } from '../../model/class/Employee';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-earned-leave',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './earned-leave.component.html',
  styleUrl: './earned-leave.component.css'
})
export class EarnedLeaveComponent implements OnInit {

  projectForm: FormGroup = new FormGroup({})

  isFormVisiable = signal<boolean>(false)
  masterSrv=inject(MasterService)
  empList$: Observable<Employee[]> = new Observable<[]>
  Earnedleave =signal<IEarnedLeave[]>([])
  Earnedobj: IEarnedLeave = {
    earnedLeaveId: 0,
    employeeId: 0,
    totalEarnedLeaves: 0,
    totalSickEarnedLeaves: 0,
    lastUpdatedDate: ''
  };
  

  constructor(){
    this.empList$ = this.masterSrv.getAllEmp()
  }

  ngOnInit(): void {
    this.Form()
    this.getAllEarnedleave()
  }
  Form(){
    this.projectForm=new FormGroup({
      earnedLeaveId: new FormControl(0),
      employeeId: new FormControl(0),
      totalEarnedLeaves: new FormControl(0),
      totalSickEarnedLeaves: new FormControl(0),
      lastUpdatedDate:new FormControl('')
    })
  }
  getAllEarnedleave() {
    this.masterSrv.getAllEarnedleave().subscribe((Res:IEarnedLeaveResponse) => {
      if (Res.data) {
        this.Earnedleave.set(Res.data); // Set only the `data` array to the signal
      } else {
        console.error("Data not found in response:", Res);
      }
    });
  }
  trackByIndex(index: number): number {
    return index;
  }
  onSave(){
    debugger;
   this.masterSrv.saveEarnedleave(this.Earnedobj).subscribe((res:IEarnedLeaveResponse)=>{
     alert("employee created")
     this.getAllEarnedleave
     this.Earnedobj={
      earnedLeaveId: 0,
      employeeId: 0,
      totalEarnedLeaves: 0,
      totalSickEarnedLeaves: 0,
      lastUpdatedDate: ''
    }
   },error=>{
    alert('API Error')
   }) 
  }
  onEdit(id: number) {
    let isEdit = confirm('Are you sure you want to edit?');
    console.log("edit okay")
    if (isEdit) { 
      this.masterSrv.editEarnedLeave(id).subscribe((res:any) => {
          console.log("API Response:", res);  // Check the response structure
          if (res && res.data) {
            // If 'data' is present in the response, proceed as expected
            console.log(res.data)
            this.projectForm.patchValue({
              earnedLeaveId: res.data.earnedLeaveId,
              employeeId: res.data.employeeId,
              totalEarnedLeaves: res.data.totalEarnedLeaves,
              totalSickEarnedLeaves: res.data.totalSickEarnedLeaves,
              lastUpdatedDate: res.data.lastUpdatedDate
            });
            console.log('Form values after patch:', this.projectForm.value);
            this.isFormVisiable.set(true);
          } else {
            alert('Data not found');
          }
        },
        (error) => {
          console.error("API Error:", error);
          alert('API Error');
        }
      );
      
    }
  }
  
  deleteLeave(id: number){
    let isDelete= confirm("are you sure want to delete");
    if(isDelete){
     this.masterSrv.delEarnedleave(id).subscribe((res:IEarnedLeave[])=>{
       alert("Successfully Delete")
       this.getAllEarnedleave()
     },error=>{
       alert("API Error")
     }) 
    }
  }
  
}
