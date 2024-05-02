const express = require('express');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'email@email.com',
            password: 'taters',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'David',
            email: 'email1@email.com',
            password: 'salad',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && database.users[0].password === req.body.password) {
        res.json('success');
    } else {
        res.status(400).json('fail');
    }
    res.json('signin');    
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    database.users.push({
        id: '125',
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(400).json('not found');
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user.entries++);
        }
    })
    if (!found) {
        res.status(400).json('not found');
    }
})

/*
--> res = hello world
signin --> POST = success/fail
register --> POST = user
profile/:userId --> GET = user
image --> PUT --> user


*/