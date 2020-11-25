const mongoose = require('mongoose') // mongoose모델 가져오기
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email:{
        type: String,
        trim: true,//빈칸(공백)을 없애주는 역할
        unique:1
    },
    password:{
        type: String,
        minlength: 5
    },
    lastname:{
        type: String,
        maxlength: 50
    },
    role:{
        type: Number,//관리자인지 일반 유저인지
        default:0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp:{//token 유효기간
        type: Number
    }
})

const User = mongoose.model('User', userSchema)

module.exports = {User}