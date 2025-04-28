import { Component, inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { Ileavereq, Ileavereqres, Ileavetype, Ileavetyperes } from '../../model/interface/master';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from '../../model/class/Employee';

@Component({
  selector: 'app-empleave',
  standalone: true,
  imports: [CommonModule,AsyncPipe],
  templateUrl: './empleave.component.html',
  styleUrl: './empleave.component.css'
})
export class EmpleaveComponent implements OnInit {

  projectForm: FormGroup = new FormGroup({})
  masterSrv=inject(MasterService)
  leavereq=signal<Ileavereq[]>([])
  isFormVisiable = signal<boolean>(false)

  empList$: Observable<any> = this.masterSrv.getAllEmp();
  leavetype$: Observable<Ileavetyperes> = this.masterSrv.getAllLeavetype();

  leavereqobj: Ileavereq = {
    leaveId: 0,
    employeeId: 0,
    leaveTypeId: 0,
    startDate: '',
    endDate: '',
    status: '',
    reason: '',
    requestDate:'',
    employeeName: '',
    contactNo:'',
    typeName: ''
  };
  constructor(){}
    // this.empList$ = this.masterSrv.getAllEmp()
    // this.leavetype$=this.masterSrv.getAllLeavetype()
  
  ngOnInit(): void {
    this.Form()
    this.getAllleavereq()
  }
  getAllleavereq(){
    this.masterSrv.getAllLeavereq().subscribe((res:Ileavereqres)=>{
      this.leavereq.set(res.data)
    })
  }
  Form(){
    this.projectForm=new FormGroup({
      leaveId: new FormControl(0),
      employeeId: new FormControl(0),
      leaveTypeId: new FormControl(0),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      status: new FormControl(''),
      reason: new FormControl(''),
      requestDate:new FormControl(''),
      employeeName: new FormControl(''),
      contactNo: new FormControl(''),
      typeName: new FormControl('')
      
      // earnedLeaveId: new FormControl(0),
      // employeeId: new FormControl(0),
      // totalEarnedLeaves: new FormControl(0),
      // totalSickEarnedLeaves: new FormControl(0),
      // lastUpdatedDate:new FormControl('')
    })
  }
  onSave(){
    debugger;
    this.masterSrv.saveleavereq(this.leavereqobj).subscribe((res:Ileavereqres)=>{
      alert("employee created")
      this.getAllleavereq
      this.leavereqobj={
        leaveId: 0,
        employeeId: 0,
        leaveTypeId: 0,
        startDate: '',
        endDate: '',
        status: '',
        reason: '',
        requestDate:'',
        employeeName: '',
        contactNo:'',
        typeName: ''
      }
   })
 }
}
