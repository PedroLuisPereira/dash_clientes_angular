import { Component } from '@angular/core';
import { EmployeeService } from '../../services/client.service';
import { IClient } from '../../models/Client';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {

  employees: IClient[] = [];
  employee!: IClient;

  constructor(
    private employeeService: EmployeeService,
    //private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.employeeService.getAllEmployee().subscribe({
      next: (response) => {

        this.employees = response;
        

        // if (response.data) {
        //   this.employees = response.data;
        // }
      },
    });
  }

}
