import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-employeeleave-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './employeeleave-dashboard.component.html',
  styleUrl: './employeeleave-dashboard.component.css'
})
export class EmployeeleaveDashboardComponent implements OnInit{

  // earnedLeave = 0;
  // totalNewLeaves = 0;
  // totalApprovedLeaves = 0;
  // totalCanceledLeave = 0;
  leavedashboard: any;

  masterSrv= inject(MasterService)


  ngOnInit(): void {
    this.masterSrv.getEmpLeaveDashboard().subscribe((Res:any)=>{
      this.leavedashboard = Res;
    })
  }

}
