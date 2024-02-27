import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeGeneralComponent } from './employee-general.component';
import { Employee } from '../Interfaces/Employee';
import { EmployeeService } from '../Services/employee.service';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
describe('EmployeeGeneralComponent', () => {
  let component: EmployeeGeneralComponent;
  let fixture: ComponentFixture<EmployeeGeneralComponent>;
  let employeeServiceSpy: jasmine.SpyObj<EmployeeService>;

  beforeEach(async () => {
    // Crear un SpyObj para el servicio de empleado
    const spy = jasmine.createSpyObj('EmployeeService', ['getEmployees']);

    await TestBed.configureTestingModule({
      declarations: [ EmployeeGeneralComponent ],
      imports: [ FormsModule ],
      providers: [
        { provide: EmployeeService, useValue: spy }
      ]
    })
    .compileComponents();

    employeeServiceSpy = TestBed.inject(EmployeeService) as jasmine.SpyObj<EmployeeService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getEmployees and set employees array on initialization', () => {
    const mockEmployees: Employee[] = [
      { id: 1, name: 'Employee 1', salary: 1000, age: 30, urlImg: 'image1.jpg' , salaryAnual: 12000},
      { id: 2, name: 'Employee 2', salary: 2000, age: 35, urlImg: 'image2.jpg' , salaryAnual: 24000}
    ];

    employeeServiceSpy.getEmployees.and.returnValue(of(mockEmployees));

    component.ngOnInit();
    fixture.detectChanges();

    expect(employeeServiceSpy.getEmployees).toHaveBeenCalled();
    expect(component.originalEmployees).toEqual(mockEmployees);
    expect(component.employees).toEqual(mockEmployees);
  });

  it('should filter employees by name', () => {
    const mockEmployees: Employee[] = [
      { id: 1, name: 'Employee 1', salary: 1000, age: 30, urlImg: 'image1.jpg', salaryAnual: 12000},
      { id: 2, name: 'Employee 2', salary: 2000, age: 35, urlImg: 'image2.jpg' , salaryAnual: 24000}
    ];

    component.originalEmployees = mockEmployees;

    component.searchText = 'Employee 1';
    component.applyFilters();

    expect(component.employees.length).toBe(1);
    expect(component.employees[0].name).toBe('Employee 1');
  });

  // Agrega más pruebas según sea necesario para cubrir otras funciones y escenarios
});
