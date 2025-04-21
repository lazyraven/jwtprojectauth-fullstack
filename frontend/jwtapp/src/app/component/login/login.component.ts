import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: "",
      password: ""
    })
  }

  ValidateEmail = (email: any) => {
    let validRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.match(validRegex)) {
      return true;
    } else {
      return false
    }
  }
  submit(): void {
    let user = this.form.getRawValue()
    console.log("user", user);
    if (user.name == "" || user.email == "" || user.password == "") {
      alert("please enter all the fields.")
    } else if (!this.ValidateEmail(user.email)) {
      alert("please enter a valid email.")
    } else {
      this.http.post("http://localhost:5000/api/login", user, {
        withCredentials: true
      }).subscribe(() =>
        this.router.navigate(['/']), (err) => {
          // added message in API check i indexedD.js file : Backend
          alert(err.error.message)
        }
      )
    }
    // Swal.fire("Error", "Please enter valid email", "error");
  }
}
