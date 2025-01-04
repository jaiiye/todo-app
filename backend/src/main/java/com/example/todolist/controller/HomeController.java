package com.example.todolist.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/welcome") // zmiana z / na /api/welcome
    public String home() {
        return "Welcome to the ToDo List Application!";
    }
}
