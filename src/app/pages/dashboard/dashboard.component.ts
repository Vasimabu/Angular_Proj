import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../model/class/Employee';
import { IProject } from '../../model/interface/master';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  // masterSrv= inject(MasterService)
  // empList$: Observable<Employee[]> = new Observable<[]>
  // projList$: Observable<IProject[]> = new Observable<[]>
  // empListLength: number = 0;
  // projectLength: number=0;
  AllprojList: number=0;
  dashboardData: any;

  masterSrv= inject(MasterService)
  // constructor(private masterSrv: MasterService) {}

  ngOnInit() {
    this.masterSrv.getDashbvaordData().subscribe((Res:any)=>{
      this.dashboardData =  Res;
    });
    // this.masterSrv.getAllEmp().subscribe(empList => {
    //   this.empListLength = empList.length;  // Update empListLength
    // });
    // this.masterSrv.getAllProject().subscribe(projList => {
    //   this.projectLength = projList.length;  // Update empListLength
    // });
    this.masterSrv.getAllEmpProject().subscribe(projList => {
      this.AllprojList = projList.length;  // Update empListLength
    });
  }
}
