const express = require('express');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');




const app = express();
const port = 80;
const tokens = [];
const list = [
    {
        id: 'hbo895',
        name: 'پرسشنامه فرهنگ و هنر',
        count: 25,
        isAnswered: true
    },
    {
        name: 'پرسشنامه اطلاعات عمومی',
        count: 30,
        isAnswered: false
    },
    {
        id: 'ntf875',
        name: 'پرسشنامه تجربه کاربر',
        count: 30,
        isAnswered: false
    },
    {
        id: 'amc101',
        name: 'گرشاسپ‌نامه تخصصی',
        count: 29,
        isAnswered: false
    },
    {
        id: 'cw8741',
        name: 'نظریه ریسمان',
        count: 1,
        isAnswered: false
    },
]


// app.use(express.urlencoded({ extended: true }))
app.use(function (req, res, next) {
    req.headers['content-type'] = 'application/json';
    next();
});

app.use(express.json())
app.use(cors());
app.options('*', cors());

app.get('/list', function (req, res) {
    if (req.headers && req.headers.token && tokens.includes(req.headers.token)) {
        res.json(list)
    } else {
        res.status(401).json({ error: 'دسترسی غیر مجاز!' })
    }
})

app.post('/login', function (req, res) {
    const { body } = req;
    if (!body.hasOwnProperty('username') || !body.hasOwnProperty('password')) {
        res.status(400).json({ error: '.داده ارسالی باید شامل نام کاربری و کلمه عبور باشد' })
        return
    }

    if (body.username === 'part' && body.password === '123456') {
        const token = uuidv4();
        tokens.push(token);
        res.json({ token })
    } else {
        res.status(403).json({ error: 'نام کاربری یا کلمه عبور اشتباه است.' })
        return
    }

})

app.get('/easy-uuid', function (req, res) {
        res.json(uuidv4())
})

app.get('/easy-list', function (req, res) {
    res.json(list)
})

app.get('*', function (req, res) {
    res.status(404).json({ error: 'invalid request' })
})

app.listen(process.env.PORT || port, () => {
    console.log('Listening on port 80');
})