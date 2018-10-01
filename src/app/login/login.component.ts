import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { CommonServices } from "../common.service";

@Component({
    templateUrl: 'login.component.html',
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
export class LoginComponent implements OnInit {
    display: string = 'none';
    EmailID = new FormControl('', [Validators.required, Validators.email]);
    Password = new FormControl('', [Validators.required, Validators.minLength(8)]);
    
    getUrl()
    {
      return "url('http://estringsoftware.com/wp-content/uploads/2017/07/estring-header-lowsat.jpg')";
    }

    get_Email_ID_Error() {
        return this.EmailID.hasError('required') ? 'Email ID is required' : this.EmailID.hasError('email') ? 'Please enter valid Email ID' : '';
    }

    get_Password_Error() {
        return this.Password.hasError('required') ? 'Password is required' : (String(this.Password.value).length <= 8) ? 'Password must have atleast 8 characters' : '';
    }

    height: number
    constructor(
        private commonServices: CommonServices,
        private snackBar: MatSnackBar,
        private router: Router
    ) {
        if (localStorage.getItem("UserData") != null) {
            this.router.navigate(['/dashboard'])
        } else if (localStorage.getItem("UserData") == null) {
            this.router.navigate(['/login'])
        }
        this.height = window.innerHeight;
    }

    ngOnInit() {

    }

    onSubmit() {
        this.display = 'block';
        var RequestBody = {
            "EmailID": this.EmailID.value,
            "Password": this.Password.value
        }
        this.commonServices.http_call_method(this.commonServices.Login, RequestBody).then((ApiData) => {
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
