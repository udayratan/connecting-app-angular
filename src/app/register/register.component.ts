import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CommonServices } from "../common.service";
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';

@Component({
    templateUrl: 'register.component.html',
    styles: [`   
    .formFieldWidth {
        width: 100%;
      },
      .checked_section{
        display: flex;
        align-content: center;
        align-items: center;
        height: 60px;
      }
      .checked{
        margin: 0 10px;
      }
    `]
})
export class RegisterComponent implements OnInit {
    // Admin_Code = 'E29CD-AWS3A-RF6MN-76DDA-PT45F'

    display: string = 'none';
    Name = new FormControl('', [Validators.required]);
    PhoneNumber = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]);
    EmailID = new FormControl('', [Validators.required, Validators.email]);
    DOB = new FormControl('', [Validators.required]);
    Password = new FormControl('', [Validators.required, Validators.minLength(8)]);
    Whether_Admin_User = false;
    Admin_Code = new FormControl('', [Validators.required]);
    get_Name_Error() {
        return this.Name.hasError('required') ? 'Name is required' : '';
    }
    get_Phone_Number_Error() {
        return this.PhoneNumber.hasError('required') ? 'Phone Number is required' : (String(this.PhoneNumber.value).length < 10) ? 'Phone number must be 10 digits' : (String(this.PhoneNumber.value).length > 10) ? 'Phone number must be 10 digits' : '';
    }
    get_Email_ID_Error() {
        return this.EmailID.hasError('required') ? 'Email ID is required' : this.EmailID.hasError('email') ? 'Please enter valid Email ID' : '';
    }
    get_DOB_Error() {
        return this.DOB.hasError('required') ? 'Date of Birth is required' : '';
    }
    get_Password_Error() {
        return this.Password.hasError('required') ? 'Password is required' : (String(this.Password.value).length <= 8) ? 'Password must have atleast 8 characters' : '';
    }
    get_Admin_Code_Error() {
        return (this.Admin_Code.hasError('required') && this.Whether_Admin_User) ? 'Admin Code is required' : '';
    }
    height: number
    constructor(
        private commonServices: CommonServices,
        private snackBar: MatSnackBar,
        private router: Router
    ) {
        this.height = window.innerHeight;

    }

    ngOnInit() {

    }

    onSubmit() {
        this.display = 'block';
        let DOBArray = String(this.DOB.value).split('-');
        let DOB = `${DOBArray[2]}-${DOBArray[1]}-${DOBArray[0]}`;
        var RequestBody = {
            "Whether_Admin_User": this.Whether_Admin_User,
            "Admin_Code": this.Admin_Code.value,
            "Name": this.Name.value,
            "EmailID": this.EmailID.value,
            "PhoneNumber": this.PhoneNumber.value,
            "DOB": DOB,
            "Password": this.Password.value
        }

        this.commonServices.http_call_method(this.commonServices.Register_User, RequestBody).then((ApiData) => {
            var Data: any = [];
            Data = ApiData;
            if (Data.success) {
                this.display = 'none';
                this.snackBar.open(
                    Data.extras.Status,
                    null,
                    {
                        duration: 2000
                    }
                );
                localStorage.setItem('UserData', JSON.stringify(Data.extras.Data));
                this.router.navigateByUrl("/dashboard")
            } else {
                this.display = 'none';
                this.snackBar.open(
                    this.commonServices.ApiMessages[Data.extras.msg],
                    null,
                    {
                        duration: 2000
                    }
                );
            }
        }).catch((err) => {
            console.error("Some API Call Error---->", err);
            alert(JSON.stringify(err));
        })
    }
}
