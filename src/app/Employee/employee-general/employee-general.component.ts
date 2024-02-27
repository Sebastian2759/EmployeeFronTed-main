import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../Services/employee.service';
import { Employee } from '../Interfaces/Employee';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-employee-general',
  templateUrl: './employee-general.component.html',
  imports: [FormsModule,NgFor,NgIf],
  styleUrls: ['./employee-general.component.css'],
  providers: [EmployeeService],
  standalone: true
})
export class EmployeeGeneralComponent implements OnInit {
  public exeption : string | null = null;
  public searchText: string = '';
  public searchId: number = 0;
  public employees: Employee[] = [];
  public originalEmployees: Employee[] = []; // Lista original de empleados
  public randomImageNumber: number = Math.floor(Math.random() * 6) + 1;

  constructor(private _service: EmployeeService) {}

  ngOnInit() {
    this.getEmployees();
    this.exeption = null;
  }
 // Método para mostrar el mensaje de excepción
 showException(message: string) {
  this.exeption = message;
}

// Método para cerrar el mensaje de excepción
closeException() {
  this.exeption = null;
}
  private getEmployees() {
    this._service.getEmployees().subscribe(
      (data: Employee[]) => {
        this.originalEmployees = data;
        this.applyFilters();
      },
      (error) => {
        if (error.error.includes('demasiadas solicitudes')) {
          this.exeption = 'Has hecho demasiadas solicitudes seguidas, espera unos minutos.';
        }
      }
    );
  }

  private setEmployeeImageUrls() {
    this.employees.forEach(employee => {
      employee.urlImg = `assets/Img/${Math.floor(Math.random() * 6) + 1}.jpg`;
    });
  }

  formatSalary(salary: number): string {
    return '$ ' + salary.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  public applyFilters() {
    if(this.employees.length === 1 && this.searchText.trim() === ''){
      this.employees = [...this.originalEmployees];
    }
    if (!this.searchText.trim() && (this.searchId === null || this.searchId === undefined || this.searchId === 0)) {
      // Si tanto el campo de texto como el campo de ID están vacíos, mostrar el listado completo
      this.employees = [...this.originalEmployees];
    } else {
      // Aplicar filtros según los criterios de búsqueda
      this.employees = this.originalEmployees.filter(employee =>
        (this.searchText.trim() === '' || employee.name.toLowerCase().includes(this.searchText.toLowerCase())) &&
        (this.searchId === 0 || employee.id === this.searchId)
      );
    }
    this.setEmployeeImageUrls();
  }

  filterEmployeesByName() {
    this.applyFilters();
  }

  filterEmployeesById() {
    this.applyFilters();
  }

  SearchEmployee(id: number) {
    this._service.getEmployee(id).subscribe(
      (data: Employee) => {
        this.employees = [data];
        console.log('employees', this.employees)
        this.setEmployeeImageUrls();
      },
      (error) => {
        if (error.error.includes('No se encontró el usuario con ID')) {
          this.exeption = 'No se encontró el usuario con el ID especificado.',id;
        } 
        if (error.error.includes('demasiadas solicitudes')) {
          this.exeption = 'Has hecho demasiadas solicitudes seguidas, espera unos minutos.';
        }
       
      }
    );
  }
}
