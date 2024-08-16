import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StudentsService} from "../services/students.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent implements OnInit {

  paymentId!: number;
  pdffileurl: any;

  constructor(private studentsService: StudentsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.paymentId = this.route.snapshot.params['id'];
    this.studentsService.getPaymentDetails(this.paymentId).subscribe({
      next: value => {
        let blob: Blob = new Blob([value], {type: 'application/pdf'});
        this.pdffileurl = window.URL.createObjectURL(blob);

      },
      error: err => {
        console.log(err)
      }

    });

  }

  afterLoadComplete($event: any) {

  }
}
