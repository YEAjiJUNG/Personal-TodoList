const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const { User } = require('./models/User');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { auth } = require('./middleware/auth');

//application/x-www-form-urlencoded타입으로 된것
//bodyparser가 client에서 오는 정보를 서버에서 분석해서 가져올 수 있게 해준다.
app.use(bodyParser.urlencoded({extended: true}));

//application/json(json타입으로 된 것을 분석해서 가져올 수 있게 함)
app.use(bodyParser.json());

app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB Connected...'))
    .catch(err => console.log(err))


//회원가입 할때 필요한 정보들을 client에서 가져오면 
//그것들을 데이터 베이스에 넣어준다.
app.post('/api/users/register', (req,res) => {

    //bodyparser을 이용해서req.body로 client에서 보내준 정보를 받아준다.
    const user = new User(req.body)//인스턴스 만들기(req.body는 bodyparser 때문에 가능)
    user.save((err,userInfo ) => {//save는 mongoDb의 method, 정보들이 유저모델에 저장
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/api/users/login', (req, res) => {
    //요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err, user) =>{
        if(!user){
            //email을 가진 유저가 없다면 user가 없다는 것
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        //요청한 이메일이 db에 있다면 비밀번호가 같은지 확인
        user.comparePassword(req.body.password , (err, isMatch) => {
            if(!isMatch)
                return res.json({ loginSuccess: false, message:"비밀번호가 틀렸습니다."})
        

            //비밀번호가 같다면 토큰을 생성한다. //method의 user는 에러가 없을 때 보낸 정보
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);

                //토큰을 저장한다. 어디에? 현재 user에 토큰이 들어있음, 쿠키나 로컬스테이지 같은 곳에 저장 가능

                return res.cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess: true, userId: user._id})
            })
        })
    })
})
//auth는 미들웨어, req받은다음 콜백함수 하기전에 중간에서 어떤걸 해준다.
app.get('/api/users/auth', auth, (req, res) => {
    //여기까지 미들웨어를 통과해 왔다는 얘기는 Auth가 true라는 말
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0? false: true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})
//로그인 된 상태기 때문에 auth를 넣어준다.
app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id },
    {token: ""},(err, user) => {
        if(err) return res.json({ success: false, err});
        return res.status(200).send({
            success: true
        })
    })
})

// Get Todo list from auth(token)
app.get('/api/users/todolist', auth, (req, res) => {
    res.status(200).json({
        listSuccess: true, name: req.user.name, email: req.user.email, todolist: req.user.todolist})
})

// Update todolist
// Add New todo element
// Modify exist todo element
// Body {
//  _id: dsjfqwicowo (optional) => modify
//  todo:
//}

app.put('/api/users/todoinsert', auth, (req, res) => {
    var useremail = req.user.email;
    var todo = req.body.todo;
    list = req.user.todolist;
    list.push({"body": todo});

    User.updateTodoList(useremail, list, (err) => {
        if (err) {
            return res.status(400).json({
                success: false
            })
        }
        return res.status(200).json({
            success: true
        })        
    })
})

app.put('/api/users/todolist', auth, (req, res) => {
    var useremail = req.user.email; 
    var list = req.body.todolist;

    User.updateTodoList(useremail, list, (err) => {
        if (err) {
            return res.status(400).json({
                success: false
            })
        }
        return res.status(200).json({
            success: true
        })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 
