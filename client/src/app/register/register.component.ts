import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../_services/account.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  // @Input() usersFromHomeComponent: any;
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = [];

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private fb:FormBuilder,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8)
      ]],
      confirmPassword: ['', [
        Validators.required,
        this.matchValues('password')
      ]],
    });

    // this.registerForm = new FormGroup({
    //   username: new FormControl('hihihhi', Validators.required),
    //   password: new FormControl('', [
    //     Validators.required,
    //     Validators.maxLength(8),
    //     Validators.minLength(4),
    //   ]),
    //   confirmPassword: new FormControl(),
    // });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return (
        control?.value === control?.parent?.controls[matchTo].value
          ? null
          : { isMatching: true }
      );
    };
  }

  register() {
    this.accountService?.register(this.registerForm.value).subscribe(
      (res) => {
        this.router.navigateByUrl('/members');
      },
      (err) => {
        this.validationErrors = err;
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }
}
