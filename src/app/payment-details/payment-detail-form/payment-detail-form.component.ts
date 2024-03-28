import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { NgForm } from '@angular/forms';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styles: [
  ],
  providers:[PaymentDetailService]
})
export class PaymentDetailFormComponent implements OnInit {
  constructor(public service:PaymentDetailService,private toastr:ToastrService) { }

  ngOnInit() {

  }
  //upload an image on UI
imageUrl:string="/assets/img/download.png";
  fileToUpload : File = null;
  handleFileInput(event:any){
    this.fileToUpload=event.currentTarget.files[0];
    var reader = new FileReader();
    reader.onload = (event:any)=>{
      console.log(55)
      this.imageUrl=event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  //submit an image in Database

  OnSubmit(Caption:any,Image:any){
    this.service.postFile(Caption.value,this.fileToUpload).subscribe(
      data=>{
        console.log('done');
        Caption.value=null;
        Image.value=null;

        this.imageUrl="/assets/img/download.png";
      }
    );
  }

//submit record
  onSubmit(form:NgForm){
    if(this.service.formData.paymentDetailId==0)
    this.insertRecord(form);
    else
    this.updateRecord(form);
  }

  insertRecord(form:NgForm){
    this.service.postPaymentDetail().subscribe(
      res=>{
  this.resetForm(form);
  this.service.refreshList();
  this.toastr.success('Submitted Successfully','Payment Detail Register')
      },
      err=> { console.log(err);}
    );
  }

  updateRecord(form:NgForm){
    this.service.putPaymentDetail().subscribe(
      res=>{
  this.resetForm(form);
  this.service.refreshList();
  this.toastr.info('Updated Successfully','Payment Detail Register')
      },
      err=> { console.log(err);}
    );
  }

resetForm(form:NgForm){
  form.form.reset();
  this.service.formData=new PaymentDetail();
}
}
