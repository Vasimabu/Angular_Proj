import { Component, inject, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { Ileavetype, Ileavetyperes } from '../../model/interface/master';

@Component({
  selector: 'app-leavetype',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './leavetype.component.html',
  styleUrl: './leavetype.component.css'
})
export class LeavetypeComponent implements OnInit {
  isFormVisiable = signal<boolean>(false)
  projectForm: FormGroup = new FormGroup({})
  masterSrv=inject(MasterService)

  leavetype=signal<Ileavetype[]>([])

  ngOnInit(): void {
    this.getallleave()
  }
  getallleave(){
    this.masterSrv.getAllLeavetype().subscribe((res:Ileavetyperes)=>{
      this.leavetype.set(res.data)
    })
  }
  onSave(){

  }
  onEdit(){

  }
  deleteLeave(){

  }

}
