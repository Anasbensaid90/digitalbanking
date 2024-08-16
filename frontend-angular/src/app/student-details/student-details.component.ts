import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StudentsService} from "../services/students.service";
import {Payment} from "../model/students.model";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit{

  studentCode!:string;
  studentPayments!:Array<Payment>;
  paymentDataSource!:MatTableDataSource<Payment>;
  public displayedColumns = ['id','date','type','status','amount','firstName','details'];
  constructor(private activatedRoute:ActivatedRoute,
              private studentsService:StudentsService,
              private router :Router){

  }

  ngOnInit() {
    this.studentCode=this.activatedRoute.snapshot.params['code'];
    this.studentsService.getStudentsPayments(this.studentCode).subscribe({
      next:value => {
        this.studentPayments=value;
        this.paymentDataSource=new MatTableDataSource<Payment>(this.studentPayments)
      },
      error:err => {
        console.log(err);
      }

    });

  }

  newpayment() {
    this.router.navigateByUrl(`/admin/new-payment/${this.studentCode}`)

  }

  paymentdetails(payment:Payment) {
    this.router.navigateByUrl(`/admin/payment-details/${payment.id}`)

  }
}
