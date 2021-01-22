const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const { User } = require('./models/User');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { auth } = require('./middleware/auth');

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB Connected...'))
    .catch(err => console.log(err))


app.post('/api/users/register', (req,res) => {

    const user = new User(req.body)
    user.save((err,userInfo ) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/api/users/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) =>{
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        user.comparePassword(req.body.password , (err, isMatch) => {
            if(!isMatch)
                return res.json({ loginSuccess: false, message:"비밀번호가 틀렸습니다."})
        
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);

                return res.cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess: true, userId: user._id})
            })
        })
    })
})
app.get('/api/users/auth', auth, (req, res) => {
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
app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id },
    {token: ""},(err, user) => {
        if(err) return res.json({ success: false, err});
        return res.status(200).send({
            success: true
        })
    })
})

app.delete('/api/users/todo', auth, (req, res) => {
    var useremail = req.user.email;
    var index = req.body.index;
    var list = req.user.todolist;
    list.splice(index, 1);
    User.updateTodoList(useremail, list, (err) => {
        if (err) {
            return res.status(400).json({
                success:false
            })
        }
        return res.status(200).json({
            success: true
        })
    })
})

app.get('/api/users/todolist', auth, (req, res) => {
    res.status(200).json({
        listSuccess: true, name: req.user.name, email: req.user.email, todolist: req.user.todolist})
})

app.put('/api/users/todo', auth, (req, res) => {
    console.log(req.body);
    var useremail = req.user.email;
    var todo = req.body.todo;
    var _id = req.body._id;
    var list = req.user.todolist;
    var check = false;
    list.forEach(function(entry, index, list) {
        if (entry._id == _id) {
            entry.body = todo;
            check = true;
        }
    });

    if (!check) {
        return res.status(400).json({
            success: false,
            message: "There is no entry"
        });
    }

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
