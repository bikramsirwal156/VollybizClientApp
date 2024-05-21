import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-action',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './filter-action.component.html',
  styleUrl: './filter-action.component.scss'
})
export class FilterActionComponent implements OnInit {

  public filterForm:FormGroup;

  @Input() selectFilter: any;
  @Output() emitFilter = new EventEmitter<any>();

  constructor(private fb:FormBuilder) {
   
    
  }
  ngOnInit(): void {
    this.Initailize();


    this.filterForm.valueChanges.subscribe(value => {
      if (value.all) {
        this.filterForm.patchValue({ Male: false, Female: false }, { emitEvent: false });
      } else if (value.Male) {
        this.filterForm.patchValue({ all: false, Female: false }, { emitEvent: false });
      } else if (value.Female) {
        this.filterForm.patchValue({ all: false, Male: false }, { emitEvent: false });
      }
    });
  }


  Initailize(){

    this.filterForm = this.fb.group({
      gender: ['All'] // Set default value here
    });

    this.filterForm.get('gender').valueChanges.subscribe(value => {
      this.onGenderChange(value);
    });
    
  }

  onGenderChange(value: string) {
    let value1:number=0;
    if(value=='All'){
      value1=6;
    }
    if(value=='Male'){
      value1=4;
    }

    if(value=='Female'){
      value1=2;
    }
    this.emitFilter.emit(value1);
    console.log('Selected Gender:', value);
  }
}