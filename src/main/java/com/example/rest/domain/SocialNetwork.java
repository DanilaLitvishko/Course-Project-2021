package com.example.rest.domain;

import javax.persistence.*;

@Entity
@Table(name = "social_network")
public class SocialNetwork {
    @Id
    String name;
    String core;
    String content;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCore() {
        return core;
    }

    public void setCore(String core) {
        this.core = core;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
