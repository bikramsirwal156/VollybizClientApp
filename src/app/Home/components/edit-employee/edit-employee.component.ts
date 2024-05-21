import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { EmployeeService } from '../../Services/employee.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss'
})
export class EditEmployeeComponent implements OnInit {

  private datitem: any;;
  private destrou$ = new Subject();
  public EditForm: FormGroup;

  options = [
    { value: 'null', text: 'Select' },
    { value: '1', text: 'Male' },
    { value: '2', text: 'Female' }
  ];
  constructor(private fb: FormBuilder,
    private empService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    let id: number = parseInt(this.route.snapshot.queryParamMap.get('id'));
    this.GetEmployeeById(id);
  }


  ngOnInit(): void {
    this.initailizeForm();
  }

  private initailizeForm() {
    this.EditForm = this.fb.group({
      Id: [this.datitem?.id || ''],
      Name: [this.datitem?.name || '', Validators.required],
      Dob: [this.datitem?.dob ? formatDate(this.datitem?.dob, 'yyyy-MM-dd', 'en') : [Validators.required]],
      MartialStatus: [this.datitem?.martialStatus || '',], // This will be  a dropdown of enum type
      Mobile: [this.datitem?.mobile || '', Validators.required],
      Gender: [this.datitem?.gender || '', Validators.required],
      Image: ['', Validators.required],
    });
  }

  OnUpdate() {
    if (this.EditForm.valid) {
      this.EditForm.get('Mobile').setValue(this.EditForm?.get('Mobile')?.value.toString());
      this.empService.EditEmployee(this.EditForm.value).pipe(takeUntil(this.destrou$)).subscribe({
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

  handleResponse(res: any) {
    if (res >= 1) {
      window.alert("Data Update successfully")
    }
    else if (res == 0) {
      window.alert("Data doesn't exist")
    }
    else {
      window.alert("Ops something went wrong!")
    }
  }

  private nevaigateToHome() {
    this.router.navigate(['home']);
  }

  onCancel() {
    this.nevaigateToHome();
  }

  OnUpdateGender(value: any) {
    this.EditForm.get('Gender').setValue(value?.target.value);
    this.EditForm.updateValueAndValidity();
  }

  private GetEmployeeById(id: number) {
    this.empService.getEmployeeById(id).pipe(takeUntil(this.destrou$)).subscribe({
      next: (v: any) => {
        this.datitem = v;
        this.EditForm.get('Gender').setValue(this.datitem.gender.toString());
        this.initailizeForm();
      },
      error: (e) => {
        window.alert(e.message)
      },
      complete: () => {
      },
    });
  }

  public numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}