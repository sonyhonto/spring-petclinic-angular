import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  errors: [];
  errorsMockTrue = [{
    "errorEffect": 'SIGN_IN',
    "error400": {"status": 400},
    "error401": {"status": 401},
    "error500": {"status": 500},
    "error0": {"status": 0},
    "error": {"status": -1}
  }]; 

  ngOnInit() {

  }

  printConsole() {
    console.log("errors mock : ", this.errorsMockTrue);
  }

}
