import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {PaymentType} from "../model/students.model";
import {StudentsService} from "../services/students.service";

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrl: './new-payment.component.css'
})
export class NewPaymentComponent implements OnInit{

  paymentFormGroup!:FormGroup;
  studentCode!: string;
  paymentTypes:string[]=[];
  pdffileurl!:string;
  constructor(private fb:FormBuilder,private activatedRoute:ActivatedRoute,private studentsService:StudentsService) {
  }

  ngOnInit() {
    for(let i in PaymentType){
      let value=PaymentType[i];
      if(typeof value==='string'){
        this.paymentTypes.push(value)
      }

    }
    this.studentCode=this.activatedRoute.snapshot.params['code']
    this.paymentFormGroup=this.fb.group({
      date:this.fb.control(''),
      amount:this.fb.control(''),
      type:this.fb.control(''),
      studentCode:this.fb.control(this.studentCode),
      fileSource:this.fb.control(''),
      fileName:this.fb.control(''),


    })
  }

  selectfile(event:any) {

    if(event.target.files.length>0){
      let file=event.target.files[0];
      this.paymentFormGroup.patchValue({
        fileSource:file,
        fileName:file.name
      });

      this.pdffileurl=window.URL.createObjectURL(file);

    }

  }

  savepayment() {
    let date:Date=new Date(this.paymentFormGroup.value.date);
    let formattedDate=date.getDate()+"/"+(date.getMonth()+1)+'/'+date.getFullYear();
    let formData=new FormData();
    formData.set('date',formattedDate);
    formData.set('amount',this.paymentFormGroup.value.amount);
    formData.set('type',this.paymentFormGroup.value.type);
    formData.set('studentCode',this.paymentFormGroup.value.studentCode);
    formData.set('file',this.paymentFormGroup.value.fileSource);
    this.studentsService.savepayments(formData).subscribe({
      next:value => {
        alert('payment saved succefully')
      },
      error:err=>{
        console.log(err);
      }
    });


  }

  afterLoadComplete(event: any) {
    console.log(event);

  }
}
