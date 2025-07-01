package com.alabenhajsaad.api.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ReactController {

    @GetMapping("/**/{path:[^\\.]*}")
    public String redirectApi() {
        return "forward:/";
    }




}

