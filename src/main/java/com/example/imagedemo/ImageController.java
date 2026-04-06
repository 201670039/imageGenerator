package com.example.imagedemo; // 메인 클래스와 같은 패키지로 지정

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin; // 추가

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Node.js와의 통신 허용
public class ImageController {

    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @GetMapping("/generate")
    public String generate(@RequestParam(value = "prompt") String prompt) {
        return imageService.generateImage(prompt);
    }
}