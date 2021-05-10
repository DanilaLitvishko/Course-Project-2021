package com.example.rest.domain;

import javax.persistence.*;

@Entity
@Table(name = "employee")
public class Employee {
    @Id
    private String surname;
    private String firstname;
    private String position;
    private String nameOfSocialNetwork;
    private String nameOfAction;
    private String nameOfCompany;


    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getNameOfSocialNetwork() {
        return nameOfSocialNetwork;
    }

    public void setNameOfSocialNetwork(String nameOfSocialNetwork) {
        this.nameOfSocialNetwork = nameOfSocialNetwork;
    }

    public String getNameOfAction() {
        return nameOfAction;
    }

    public void setNameOfAction(String nameOfAction) {
        this.nameOfAction = nameOfAction;
    }

    public String getNameOfCompany() {
        return nameOfCompany;
    }

    public void setNameOfCompany(String nameOfCompany) {
        this.nameOfCompany = nameOfCompany;
    }
}
