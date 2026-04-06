const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = 3000;

// EJS 템플릿 엔진 설정
app.set('view engine', 'ejs');
// views 폴더의 절대 경로 지정 (에러 방지)
app.set('views', path.join(__dirname, 'views'));

// 정적 파일(이미지, CSS 등) 사용 설정 (필요시)
app.use(express.static(path.join(__dirname, 'public')));

/**
 * 1. 메인 페이지 (입력창)
 */
app.get('/', (req, res) => {
    res.render('index');
});

/**
 * 2. 이미지 생성 요청 처리
 * 사용자가 입력한 prompt를 받아 Spring Boot 백엔드로 전달합니다.
 */
app.get('/generate', async (req, res) => {
    const prompt = req.query.prompt;

    if (!prompt) {
        return res.redirect('/');
    }

    try {
        console.log(`[요청 전송] 프롬프트: ${prompt}`);

        // Spring Boot 백엔드 서버(8080) 호출
        // 인코딩을 위해 encodeURIComponent 사용
        const response = await axios.get(`http://localhost:8080/generate?prompt=${encodeURIComponent(prompt)}`);

        const imageUrl = response.data; // 백엔드에서 넘겨준 이미지 URL
        console.log(`[생성 완료] 이미지 URL: ${imageUrl}`);

        // 결과 페이지(view.ejs)로 데이터 전달
        res.render('view', {
            imageUrl: imageUrl,
            prompt: prompt
        });

    } catch (error) {
        console.error('백엔드 통신 에러:', error.message);

        // 에러 발생 시 결과 페이지에서 에러 메시지 표시
        res.render('view', {
            imageUrl: null,
            prompt: prompt,
            error: '이미지를 생성하는 동안 문제가 발생했습니다. 백엔드 서버 확인이 필요합니다.'
        });
    }
});

// 서버 시작
app.listen(PORT, () => {
    console.log('-----------------------------------------');
    console.log(`🚀 프론트엔드 서버 실행 중: http://localhost:${PORT}`);
    console.log(`🔗 연결될 백엔드 주소: http://localhost:8080`);
    console.log('-----------------------------------------');
});