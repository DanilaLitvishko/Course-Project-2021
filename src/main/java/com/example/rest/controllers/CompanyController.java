package com.example.rest.controllers;

import com.example.rest.domain.Company;
import com.example.rest.domain.Employee;
import com.example.rest.repo.CompanyRepo;
import com.example.rest.repo.EmployeeRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("company")
public class CompanyController {

    private final CompanyRepo companyRepo;

    @Autowired
    public CompanyController(CompanyRepo companyRepo) {
        this.companyRepo = companyRepo;
    }

    @GetMapping
    public List<Company> list(){
        return companyRepo.findAll();
    }

    @GetMapping("{name}")
    public Company getOne(@PathVariable("name") Company company){
        return company;
    }

    @PostMapping
    public Company create(@RequestBody Company company){
        return companyRepo.save(company);
    }

    @PutMapping("{name}")
    public Company update(
            @PathVariable("name") Company companyFromDb,
            @RequestBody Company company){
        BeanUtils.copyProperties(company, companyFromDb);
        return companyRepo.save(companyFromDb);
    }

    @DeleteMapping("{name}")
    public void delete(@PathVariable("name") Company company){
        companyRepo.delete(company);
    }
}
