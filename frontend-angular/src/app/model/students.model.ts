export interface Students{
  id:string,
  code:string,
  firstName:string,
  lastName:string,
  programId:string,
  photo:string,
}

export interface Payment{
  id:number,
  date:string,
  amount:number,
  type:string,
  status:string,
  file:string,
  student:Students

}

export enum PaymentType{
  CASH,CHECK,TRANSFER,DEPOSIT
}

export enum PaymentStatus{
  CREATED,VALIDATED,REJECTED
}
