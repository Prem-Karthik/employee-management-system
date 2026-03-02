import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {

  currentPage = 0;
pageSize = 5;
totalPages = 0;

  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
  this.employeeService
    .getEmployeesPaged(this.currentPage, this.pageSize)
    .subscribe(response => {
      this.employees = response.content;
      this.totalPages = response.totalPages;
    });
}

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.loadEmployees();
    });
  }

  search(event: any) {
  const value = event.target.value;
  if (!value) {
    this.loadEmployees();
    return;
  }

  this.employeeService.searchByName(value)
    .subscribe(data => this.employees = data);
}

filter(event: any) {
  const dept = event.target.value;
  if (!dept) {
    this.loadEmployees();
    return;
  }

  this.employeeService.filterByDepartment(dept)
    .subscribe(data => this.employees = data);
}

nextPage() {
  if (this.currentPage < this.totalPages - 1) {
    this.currentPage++;
    this.loadEmployees();
  }
}

prevPage() {
  if (this.currentPage > 0) {
    this.currentPage--;
    this.loadEmployees();
  }
}
}