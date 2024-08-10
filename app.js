const express = require('express');
const path = require('path'); //path 사용
const app = express();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');//서버에서 요청과 응답을 기록하는 라우터
//6-5까지

//morgan: 1.dev: 간단하게 표시(개발 시) 2.combined: 더 자세히 표시(배포 시)
app.use(morgan('dev'));
//cookie-parser: 쿠키를 알아서 객체로 파싱시킴
app.use(cookieParser('yongmin'));
//body-parser(이 두개는 보통 사용 함)
app.use(express.json()); //json 데이터를 파싱해서 req.body에 넣음
app.use(express.urlencoded({extended: true})); //form을 파싱

app.use((req,res, next)=>{
    console.log('모든 요청에 실행하고싶어요');//미들웨어: 모든 라우터에 실행하는 모듈
    next(); //next를 안하면 미들웨어만 실행하고 다음 것을 실행하지 않음
});



app.get('/',(req,res)=>{ //3000번에 접속하면 메세지 전송
    /*
    req.cookies
    req.signedCookies; //쿠키 암호화
    //쿠키 생성
    res.cookie('name', encodeURIComponent(name),{
        expires: new Date(),
        httpOnly: true,
        path: '/'
    })
    //쿠키 삭제
    res.clearCookie('name', encodeURIComponent(name),{
        httpOnly:true,
        path: '/',
    })
    */
    res.sendFile(path.join(__dirname,'./index.html'));//현재 경로 + ./index.html
});

app.post('/',(req,res)=>{ //한 라우터나 미들웨어에 2개 이상의 send 불가능
    res.send('hello express');
});

app.get('/about',(req,res)=>{
    res.send('hello about');
});

app.use((req,res,next)=>{ //없는 라우터 처리 미들웨어(404)
    res.status(200).send('404지롱'); //기본적으론 200을 보냄
})

//에러처리 미들웨어
app.use((err,req,res,next)=>{//에러 미들웨어의 형식은 고정
    console.error(err);
    res.status(200).send('에러났지롱. 근데 안알려주지롱');
})

app.listen(3000, ()=>{ //3000번 포트에 실행
    console.log('익스프레스 서버 실행');
});