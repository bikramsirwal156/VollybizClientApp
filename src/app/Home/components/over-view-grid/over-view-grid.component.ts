import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../Services/employee.service';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FilterActionComponent } from '../filter-action/filter-action.component';

@Component({
  selector: 'app-over-view-grid',
  standalone: true,
  imports: [RouterModule, CommonModule, FilterActionComponent],
  templateUrl: './over-view-grid.component.html',
  styleUrl: './over-view-grid.component.scss'
})
export class OverViewGridComponent {
  private destrou$ = new Subject();
  public EmployeeDataList: any[] = [];
  public EmployeeDataData: any[] = [];

  constructor(
    private empservice: EmployeeService,
    private router: Router, private route: ActivatedRoute) {


  }
  ngOnInit(): void {
    this.GetAllEmplyee();
  }

  private GetAllEmplyee() {
    this.empservice.getAllEmployee().pipe(takeUntil(this.destrou$)).subscribe({
      next: (v: any) => {
        this.EmployeeDataList = v;
        this.EmployeeDataData=v;
      },
      error: (e) => {
        window.alert(e)
      },
      complete: () => {
        this.router.navigate(['home']);
      },
    });
  }

  OnAddEmployee() {
    this.router.navigate(['/add'], { relativeTo: this.route });
  }

  public OnEdit(dataitm: any) {
    this.router.navigate(['edit', { state: dataitm }]);

  }

  public OnDelete(Id: number) {
    this.empservice.DeleteEmployee(Id).pipe(takeUntil(this.destrou$)).subscribe({
      next: (v) => {
        this.GetAllEmplyee();
        this.handleResponse(v);
      },
      error: (e) => {
        window.alert(e.message)
      },
      complete: () => {
        this.router.navigate(['home']);
      },
    });
  }

  OnEmitFilter(value: any) {
    this.fetchRecords(value);
  }

  fetchRecords(count: number): any[] {
    console.log(count);
    const data = this.EmployeeDataData.slice(0, count);
    this.EmployeeDataList = data;
    return this.EmployeeDataList;
  }

  handleResponse(res: any) {
    if (res >= 1) {
      window.alert("Data deleted successfully")
    }
    else if (res == 0) {
      window.alert("Data doesn't exist")
    }
    else {
      window.alert("Ops something went wrong!")
    }
  }
}