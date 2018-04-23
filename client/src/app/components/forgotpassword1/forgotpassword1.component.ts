import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';


@Component({
  selector: 'app-forgotpassword1',
  templateUrl: './forgotpassword1.component.html',
  styleUrls: ['./forgotpassword1.component.css']
})
export class Forgotpassword1Component implements OnInit {

  form: FormGroup;
  message;
  messageClass;
  processing = false;
  emailValid;
  emailMessage;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private router: Router
  ) { this.createForm() }
  createForm(){
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validateEmail
      ])]
    });
  }
  validateEmail(controls) {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateEmail': true }
    }
  }
  ngOnInit() {
    
  }

  checkEmailForgot() {
    this.authService.checkEmailForgot(this.form.get('email').value).subscribe(data => {
      if (!data.success) {
        // set trang thai
        this.emailValid = false;
        // set message api
        this.emailMessage = data.message;
      } else {
        this.emailValid = true;
        this.emailMessage = data.message;
      }
    });
  }

  disableForm() {
    this.form.controls['email'].disable();
  }

  enableForm() {
    this.form.controls['email'].enable();
  }

  onForgotPasswordSubmit() {
    this.processing = true;
    this.disableForm();
    const user = {
      email: this.form.get('email').value,
    }
    this.authService.changePassword(user).subscribe(data => {
      if (!data.success) {
        this.messageClass = "alert alert-danger";
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = "alert alert-success";
        this.message = data.message;
        console.log(this.message);
        setTimeout(() => {
          this.router.navigate(['/login1']);
        }, 2000);
      }
    });
  }
}
