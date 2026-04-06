package com.example.imagedemo; // 동일하게 지정

import org.springframework.ai.image.ImageModel;
import org.springframework.ai.image.ImagePrompt;
import org.springframework.ai.image.ImageResponse;
import org.springframework.ai.openai.OpenAiImageOptions;
import org.springframework.stereotype.Service;

@Service
public class ImageService {

    private final ImageModel imageModel;

    public ImageService(ImageModel imageModel) {
        this.imageModel = imageModel;
    }

    public String generateImage(String message) {
        ImageResponse response = imageModel.call(
                new ImagePrompt(message,
                        OpenAiImageOptions.builder()
                                .model("dall-e-3")
                                .height(1024)
                                .width(1024)
                                .build())
        );

        if (response != null && response.getResult() != null && response.getResult().getOutput() != null) {
            return response.getResult().getOutput().getUrl();
        }
        return "이미지 생성 실패";
    }
}