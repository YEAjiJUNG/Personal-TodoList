const mongoose = require('mongoose'); // mongoose모델 가져오기
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

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
    },
    todolist:{
        type: String
    }
})

userSchema.pre('save', function(next){
    var user = this;
    //password가 바뀔때만 이루어진다.
    if(user.isModified('password')) {
        //비밀번호를 암호화시킨다.
    //salt 생성하는데에 saltRounds가 필요
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash //암호화한 비번 password에 넣기
                next()
            })  
        })
    } else{
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    //plainPassword: 1234567, 암호화된 비밀번호:..... 둘을 같은지 체크
    //plainPAssword를 다시 암호화해서 암호화한 비밀번호끼리 비교
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb){

    var user = this;

    //jsonwebtoken을 이용해서 token을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    //user._id + 'secretToken'이  token이 되는데 나중에 secretToken을 넣으면 id가 나온다.
    user.token = token
    user.save(function(err, user) {
        if(err) return cb(err)
        cb(null, user)
         //error가 없으면 콜백함수 null, 그리고 user정보만 전달
    })
}

userSchema.statics.findByToken = function(token, cb){
    var user = this;

    //user._id + 'secretToken' = token
    //토큰을 decode 한다.
    jwt.verify(token, 'secretToken', function(err, decoded){
        //유저 아이디를 이용해서 유저찾은 후 
        //클라이언트에서 가져온 token과 db에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id" : decoded, "token": token}, function(err, user){

            if(err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = {User}