import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../_services/account.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    // this.registerForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', [
    //     Validators.required,
    //     Validators.minLength(4),
    //     Validators.maxLength(8),
    //   ]),
    //   confirmPassword: new FormControl('', [
    //     Validators.required,
    //     this.matchValues('password'),
    //   ]),
    // });

    this.registerForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl()
    })
  }
  matchValues(arg0: string): import('@angular/forms').ValidatorFn {
    throw new Error('Method not implemented.');
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
