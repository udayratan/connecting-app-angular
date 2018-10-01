import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommonServices } from "../common.service";

@Component({
    templateUrl: 'dashboard.component.html',
    styleUrls: [
        './dashboard.component.css'
    ]
})
export class DashboardComponent implements OnInit {
    display: string = 'none';
    user_name: string = '';
    UserData: any;
    height: number;
    constructor(
        private commonServices: CommonServices,
        private snackBar: MatSnackBar,
        private router: Router,
        public dialog: MatDialog
    ) {
        this.height = window.innerHeight;

    }
    All_Users_Data = [];
    ngOnInit() {
        this.UserData = JSON.parse(localStorage.getItem('UserData'));
        this.user_name = this.UserData.Name;
        this.Get_All_Users_Data();
    }

    Logoff() {
        localStorage.clear();
        this.router.navigateByUrl("/login");
    }

    Get_All_Users_Data() {
        this.display = 'block';
        var RequestBody = {
            "USERID": this.UserData.USERID,
            "SessionID": this.UserData.SessionID
        }

        this.commonServices.http_call_method(this.commonServices.List_All_Users, RequestBody).then((ApiData) => {
            var Data: any = [];
            Data = ApiData;
            if (Data.success) {
                this.display = 'none';

                this.All_Users_Data = Data.extras.Data;
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


        // this.All_Users_Data = [
        //     {
        //         "USERID": "687166d8-042b-4f3b-adae-23bee676a845",
        //         "Whether_Admin_User": true,
        //         "Name": "Vijay",
        //         "EmailID": "vijay@gmail.com",
        //         "PhoneNumber": "8801362790",
        //         "DOB": "1993-05-25T18:30:00.000Z"
        //     },
        //     {
        //         "USERID": "c79a4bfa-415f-40ef-9f0e-2adf88f39ce1",
        //         "Whether_Admin_User": false,
        //         "Name": "Srikanth",
        //         "EmailID": "srikanth@gmail.com",
        //         "PhoneNumber": "8801362790",
        //         "DOB": "1993-11-10T18:30:00.000Z"
        //     }
        // ]
    };

    Edit_User_Information(UserData, index) {
        localStorage.setItem('Operation_User', JSON.stringify(UserData));
        const dialogRef = this.dialog.open(UpdateUserComponent, {
            width: '250px'
          });

          dialogRef.afterClosed().subscribe(result => {
            this.Get_All_Users_Data();
          });

    }
}

@Component({
    selector: 'update-user-component',
    templateUrl: './update-user.component.html',
  })
  export class UpdateUserComponent {
  
    constructor(
      public dialogRef: MatDialogRef<UpdateUserComponent>
      ) {

      }
      
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }
  
