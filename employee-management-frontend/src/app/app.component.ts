import { Component, ViewChild } from '@angular/core';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EmployeeFormComponent, EmployeeListComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {

  @ViewChild(EmployeeListComponent) list!: EmployeeListComponent;

  reloadList() {
    this.list.loadEmployees();
  }
}