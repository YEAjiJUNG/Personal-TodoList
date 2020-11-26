const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const { User } = require("./models/User");

const config = require('./config/key');

//application/x-www-form-urlencoded
//bodyparser가 client에서 오는 정보를 서버에서 분석해서 가져올 수 있게 해준다.
app.use(bodyParser.urlencoded({extended: true}));

//application/json(json타입으로 된 것을 분석해서 가져올 수 있게 함)
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB Connected...'))
    .catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hello Word!~~'))
//회원가입 할때 필요한 정보들을 client에서 가져오면 
//그것들을 데이터 베이스에 넣어준다.
app.post('/register', (req,res) => {

    //bodyparser을 이용해서req.body로 client에서 보내준 정보를 받아준다.
    const user = new User(req.body)

    user.save((err,userInfo) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 