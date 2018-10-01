import { Injectable, EventEmitter, Output } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";


import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { Data } from "./data.model";
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class CommonServices {
  TaskData = new EventEmitter<any>();
  Value = new EventEmitter<Data>();
  handleError(data: any) {
    const newData = new Data(data);
    this.Value.emit(newData);
  }
  responce: Response;
  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) { }

  //Api's here
  Url = "http://localhost:3000";
  Register_User = '/Register_User';
  Login = '/Login';
  List_All_Users = '/List_All_Users';

  //Http Comman Api Method
  public http_call_method(url: String, value: Object) {
    return new Promise((resolve, reject) => {
      let bodyString = value;
      this.http
        .post(this.Url + url, bodyString)
        .subscribe(
          data => {
            var ApiData: any = [];
            ApiData = data;
            var succ = ApiData.success;
            if (succ) {
              resolve(ApiData);
            } else {
              if (ApiData.extras.msg == 6) {
                localStorage.clear();
                this.router.navigateByUrl("/login")
                resolve(ApiData);
              } else {
                resolve(ApiData);
              }
            }
          },
          error => {
            reject(error);
          }
        )
    });
  }

  ApiMessages = [
    "",
    "DATABASE ERROR",
    "SUBMIT ALL VALUES",
    "EMAIL NOT REGISTERED",
    "EMAIL ALREADY REGISTERED",
    "INVALID USERID",
    "SESSION EXPIRED",
    "PASSWORD MUST HAVE ATLEAST  CHARACTERS",
    "INVALID PHONE NUMBER",
    "INVALID EMAIL FORMAT",
    "INVALID DATE FORMAT",
    "INVALID ADMIN CODE",
    "INVALID PASSWORD",
    "NOT ADMIN USER",
    "INVALID OPERATION USERID"
  ];


}
