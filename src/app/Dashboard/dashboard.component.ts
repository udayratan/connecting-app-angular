import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommonServices } from "../common.service";
import * as moment from "moment";
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
    width:number;
    constructor(
        private commonServices: CommonServices,
        private snackBar: MatSnackBar,
        private router: Router,
        public dialog: MatDialog
    ) {
        this.height = window.innerHeight;
        this.width = window.innerWidth;
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

    Remove_User(UserData, index) {
        localStorage.setItem('Operation_User', JSON.stringify(UserData));
        const dialogRef = this.dialog.open(RemoveUserComponent, {
            width: '450px'
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
        public dialogRef: MatDialogRef<UpdateUserComponent>,
        private commonServices: CommonServices,
        private snackBar: MatSnackBar
    ) {

    }
    display: string = 'none';
    UserData: any;
    Operation_User: any = JSON.parse(localStorage.getItem('Operation_User'));
    Name = new FormControl(this.Operation_User.Name, [Validators.required]);
    PhoneNumber = new FormControl(this.Operation_User.PhoneNumber, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]);
    DOB = new FormControl(moment(this.Operation_User.DOB).format('YYYY-MM-DD'), [Validators.required]);
    get_Name_Error() {
        return this.Name.hasError('required') ? 'Name is required' : '';
    }
    get_Phone_Number_Error() {
        return this.PhoneNumber.hasError('required') ? 'Phone Number is required' : (String(this.PhoneNumber.value).length < 10) ? 'Phone number must be 10 digits' : (String(this.PhoneNumber.value).length > 10) ? 'Phone number must be 10 digits' : '';
    }
    get_DOB_Error() {
        return this.DOB.hasError('required') ? 'Date of Birth is required' : '';
    }

    onSubmit() {
        this.UserData = JSON.parse(localStorage.getItem('UserData'));
        this.display = 'block';
        let DOBArray = String(this.DOB.value).split('-');
        let DOB = `${DOBArray[2]}-${DOBArray[1]}-${DOBArray[0]}`;
        var RequestBody = {
            "USERID": this.UserData.USERID,
            "SessionID": this.UserData.SessionID,
            "Operate_USERID": this.Operation_User.USERID,
            "Name": this.Name.value,
            "PhoneNumber": this.PhoneNumber.value,
            "DOB": DOB,
        }
        this.commonServices.http_call_method(this.commonServices.Update_User_Information, RequestBody).then((ApiData) => {
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
                this.close();
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
    close() {
        this.dialogRef.close();
    }

}

@Component({
    selector: 'remove-user-component',
    templateUrl: './remove-user.component.html',
})
export class RemoveUserComponent {
    constructor(
        public dialogRef: MatDialogRef<RemoveUserComponent>,
        private commonServices: CommonServices,
        private snackBar: MatSnackBar
    ) {

    }
    display: string = 'none';
    UserData: any;
    Operation_User: any = JSON.parse(localStorage.getItem('Operation_User'));

    onSubmit() {
        this.UserData = JSON.parse(localStorage.getItem('UserData'));
        this.display = 'block';
        
        var RequestBody = {
            "USERID": this.UserData.USERID,
            "SessionID": this.UserData.SessionID,
            "Operate_USERID": this.Operation_User.USERID
        }
        this.commonServices.http_call_method(this.commonServices.Remove_User, RequestBody).then((ApiData) => {
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
                this.close();
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
    close() {
        this.dialogRef.close();
    }

}

