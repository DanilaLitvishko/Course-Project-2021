package com.example.rest.controllers;

import com.example.rest.domain.Output;
import com.example.rest.repo.OutputRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("output")
public class OutputController {

    private final OutputRepo outputRepo;

    @Autowired
    public OutputController(OutputRepo outputRepo) {
        this.outputRepo = outputRepo;
    }

    @GetMapping
    public List<Output> list(){
        return outputRepo.findAll();
    }

    @GetMapping("{id}")
    public Output getOne(@PathVariable("id") Output output){
        return output;
    }

    @PostMapping
    public Output create(@RequestBody Output output){
        return outputRepo.save(output);
    }

    @PutMapping("{id}")
    public Output update(
            @PathVariable("id") Output outputFromDb,
            @RequestBody Output output){
        BeanUtils.copyProperties(output, outputFromDb);
        return outputRepo.save(outputFromDb);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Output output){
        outputRepo.delete(output);
    }
}
