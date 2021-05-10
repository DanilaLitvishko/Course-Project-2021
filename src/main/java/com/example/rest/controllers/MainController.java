package com.example.rest.controllers;

import com.example.rest.domain.Article;
import com.example.rest.domain.User;
import com.example.rest.repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;

@Controller
@RequestMapping("/")
public class MainController {

    private final ActRepo actRepo;

    private final CompanyRepo companyRepo;

    private final EmployeeRepo employeeRepo;

    private final OutputRepo outputRepo;

    private final SocialNetworkRepo socialNetworkRepo;

    @Autowired
    public MainController(ActRepo actRepo, CompanyRepo companyRepo, EmployeeRepo employeeRepo,
                          OutputRepo outputRepo, SocialNetworkRepo socialNetworkRepo) {
        this.actRepo = actRepo;
        this.companyRepo = companyRepo;
        this.employeeRepo = employeeRepo;
        this.outputRepo = outputRepo;
        this.socialNetworkRepo = socialNetworkRepo;
    }

    @GetMapping
    public String main(Model model, @AuthenticationPrincipal User user){
        HashMap<Object, Object> data = new HashMap<>();

        data.put("profile", user);
        data.put("acts", actRepo.findAll());
        //data.put("articles", articleRepo.findAll());
        data.put("companys", companyRepo.findAll());
        data.put("employees", employeeRepo.findAll());
        data.put("outputs", outputRepo.findAll());
        data.put("socialNetworks", socialNetworkRepo.findAll());

        model.addAttribute("frontendData", data);
        return "index";
    }
}
