package com.example.rest.controllers;

import com.example.rest.domain.Act;
import com.example.rest.repo.ActRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("act")
public class ActController {

    private final ActRepo actRepo;

    @Autowired
    public ActController(ActRepo actRepo) {
        this.actRepo = actRepo;
    }

    @GetMapping
    public List<Act> list(){
        return actRepo.findAll();
    }

    @GetMapping("{name}")
    public Act getOne(@PathVariable("name") Act act){
        return act;
    }

    @PostMapping
    public Act create(@RequestBody Act act){
        return actRepo.save(act);
    }

    @PutMapping("{name}")
    public Act update(
            @PathVariable("name") Act actFromDb,
            @RequestBody Act act){
        BeanUtils.copyProperties(act, actFromDb);
        return actRepo.save(act);
    }

    @DeleteMapping("{name}")
    public void delete(@PathVariable("name") Act act){
        actRepo.delete(act);
    }
}
