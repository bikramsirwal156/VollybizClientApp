import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { EmployeeService } from '../../Services/employee.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent implements OnInit {
  private destrou$ = new Subject();

  options = [
    { value: 'null', text: 'Select' },
    { value: '1', text: 'Male' },
    { value: '2', text: 'Female' }
  ];

  public AddForm: FormGroup;
  constructor(private fb: FormBuilder,
    private empService: EmployeeService,
    private router: Router
  ) {


  }
  ngOnInit(): void {
    this.initailizeForm();
  }

  private initailizeForm() {
    this.AddForm = this.fb.group({
      Id: [0],
      Name: [null, Validators.required],
      Dob: [null, Validators.required],
      MartialStatus: [null,],//This will be  a dropdown of enum type
      Mobile: [null, Validators.required],
      Gender: [null, Validators.required],
      Image: [null, Validators.required],
    });
  }

  OnAdd() {
    if (this.AddForm.valid) {
      this.AddForm.get('Mobile').setValue(this.AddForm?.get('Mobile')?.value.toString());
      this.empService.AddEmployee(this.AddForm.value).pipe(takeUntil(this.destrou$)).subscribe({
        next: (v) => {
          this.handleResponse(v);
          this.nevaigateToHome();
        },
        error: (e) => {
          window.alert(e.message)
        },
        complete: () => {
          this.router.navigate(['home']);
        },
      });
    }
  }

  private nevaigateToHome() {
    this.router.navigate(['home']);
  }
  OnUpdateGender(value: any) {
    this.AddForm.get('Gender').setValue(value?.target.value);
    this.AddForm.updateValueAndValidity();
  }


  onCancel() {
    this.nevaigateToHome();
  }

  handleResponse(res: any) {
    if (res >= 1) {
      window.alert("Data added successfully")
    }
    else if (res == 0) {
      window.alert("Data doesn't exist")
    }
    else {
      window.alert("Ops something went wrong!")
    }
  }

  public numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}