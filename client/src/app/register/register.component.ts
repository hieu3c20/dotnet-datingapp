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
  model: any = {};
  registerForm: FormGroup;

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private fb:FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
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
    console.log(this.registerForm.value);

    // this.accountService?.register(this.model).subscribe(
    //   (res) => {
    //     console.log(res);

    //     this.cancel();
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.toastr.error(err.error);
    //   }
    // );
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }
}
