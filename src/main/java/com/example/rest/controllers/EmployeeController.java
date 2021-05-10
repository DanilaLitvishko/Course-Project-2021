package com.example.rest.controllers;

import com.example.rest.domain.Employee;
import com.example.rest.domain.Human;
import com.example.rest.repo.EmployeeRepo;
import com.example.rest.repo.HumanRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("employee")
public class EmployeeController {

    private final EmployeeRepo employeeRepo;

    @Autowired
    public EmployeeController(EmployeeRepo employeeRepo) {
        this.employeeRepo = employeeRepo;
    }

    @GetMapping
    public List<Employee> list(){
        return  employeeRepo.findAll();
    }

    @GetMapping("{surname}")
    public Employee getOne(@PathVariable("surname") Employee employee){
        return employee;
    }

    @PostMapping
    public Employee create(@RequestBody Employee employee){
        return employeeRepo.save(employee);
    }

    @PutMapping("{surname}")
    public Employee update(
            @PathVariable("surname") Employee employeeFromDb,
            @RequestBody Employee employee){
        BeanUtils.copyProperties(employee, employeeFromDb);
        return employeeRepo.save(employeeFromDb);
    }

    @DeleteMapping("{surname}")
    public void delete(@PathVariable("surname") Employee employee){
        employeeRepo.delete(employee);
    }
}
