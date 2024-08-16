import {Component, OnInit} from '@angular/core';
import {Students} from "../model/students.model";
import {StudentsService} from "../services/students.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {MatTableDataSource} from "@angular/material/table";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{

  students!:Array<Students>;
  studentsDataSource!:MatTableDataSource<Students>;
  displayedColumns:string[]=['id','firstName','lastName','code','programId','payments'];
  constructor(private studentService:StudentsService,private router:Router) {
  }

  ngOnInit() {
    this.studentService.getStudents().subscribe({
      next:value => {

        this.students=value;
        this.studentsDataSource=new MatTableDataSource<Students>(this.students);

    },
    error:err=>{
        console.log(err);

    }
    })
  }

  studentpayments(student: Students) {
    this.router.navigateByUrl(`/admin/student-details/${student.code}`);

  }
}
