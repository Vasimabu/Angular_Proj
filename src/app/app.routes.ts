import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutNavComponent } from './pages/layout-nav/layout-nav.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { ProjectComponent } from './pages/project/project.component';
import { ProjectEmployeeComponent } from './pages/project-employee/project-employee.component';
import { EmployeeleaveDashboardComponent } from './pages/employeeleave-dashboard/employeeleave-dashboard.component';
import { EarnedLeaveComponent } from './pages/earned-leave/earned-leave.component';
import { LeavetypeComponent } from './pages/leavetype/leavetype.component';
import { EmpleaveComponent } from './pages/empleave/empleave.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'',
        component:LayoutNavComponent,
        children:[
            {
                path:'dashboard',
                component:DashboardComponent
            },
            {
                path:'employee',
                component:EmployeeComponent
            },
            {
                path:'projects',
                component:ProjectComponent
            },
            {
                path:'project-employee',
                component:ProjectEmployeeComponent
            },
            {
                path:'EmployeeLeaveDashboard',
                component:EmployeeleaveDashboardComponent
            },
            {
                path:'EarnedEmpLeave',
                component:EarnedLeaveComponent
            },
            {
                path:'Leave-Type',
                component:LeavetypeComponent
            },
            {
                path:'AllLeaveReq',
                component:EmpleaveComponent
            }
        ]
    }
];
