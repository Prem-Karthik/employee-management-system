package com.example.employee.controller;

import com.example.employee.entity.Employee;
import com.example.employee.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:4200")
public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController(EmployeeService service) {
        this.service = service;
    }

    // CREATE
    @PostMapping
    public Employee createEmployee(@Valid @RequestBody Employee employee) {
        return service.saveEmployee(employee);
    }
    // READ ALL
    @GetMapping
    public List<Employee> getAllEmployees() {
        return service.getAllEmployees();
    }

    // READ BY ID
    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable Long id) {
        return service.getEmployeeById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Employee updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody Employee employee) {
        employee.setId(id);
        return service.saveEmployee(employee);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable Long id) {
        service.deleteEmployee(id);
    }
    @GetMapping("/search")
    public List<Employee> searchByName(@RequestParam String name) {
        return service.searchByName(name);
    }

    @GetMapping("/department")
    public List<Employee> filterByDepartment(@RequestParam String dept) {
        return service.filterByDepartment(dept);
    }

    @GetMapping("/paged")
    public Page<Employee> getEmployeesPaged(
            @RequestParam int page,
            @RequestParam int size) {
        return service.getEmployeesPaginated(page, size);
    }
}