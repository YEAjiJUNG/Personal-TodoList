const { User } = require('../models/User');

let auth = (req, res, next) => {

    //인증처리를 하는 곳

    //클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;


    //토큰을 복호화 한 후 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true })

        req.token = token;
        req.user = user;
        next();
        //미들웨어에서 갇혀있지않도록
    })
    //유저가 있으면 인증 okay
    //없으면 인증 no;

}

module.exports = {auth} //auth를 다른 폴더에서도 사용하기 위해 추출한다.