package com.example.rest.domain;

import javax.persistence.*;

@Entity
@Table(name = "output")
public class Output {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    String surnameOfEmployee;
    String output;
    String decision;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSurnameOfEmployee() {
        return surnameOfEmployee;
    }

    public void setSurnameOfEmployee(String surnameOfEmployee) {
        this.surnameOfEmployee = surnameOfEmployee;
    }

    public String getOutput() {
        return output;
    }

    public void setOutput(String output) {
        this.output = output;
    }

    public String getDecision() {
        return decision;
    }

    public void setDecision(String decision) {
        this.decision = decision;
    }
}
