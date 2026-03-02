import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent {

  @Output() employeeAdded = new EventEmitter<void>();

  employeeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      role: ['', Validators.required],
      salary: ['', Validators.required],
      joiningDate: ['', Validators.required]
    });
  }

  submit() {
  if (this.employeeForm.invalid) return;

  this.employeeService.addEmployee(this.employeeForm.value)
    .subscribe({
      next: () => {
        this.employeeForm.reset();
        this.employeeAdded.emit();
      },
      error: err => {
        alert(JSON.stringify(err.error));
      }
    });
}
}