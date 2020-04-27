const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const SecretKey = "Uf0*wVVnkBVg+Yr@C4YSWBT";
const HeaderKey = "Pz6WbvhZAQGsUtAxRJK3vtXCrJDW6kb3yMwtnGKu2kpfT9PRVUg8RuYqFWfvFptqftcF87mBbV7pJWmPCPR5fZentc3qQVTtGLbqbjvGquT5B8UT2Kvjk7BCUm7hqtkqmJ3yR6fMFdWkWwvjTjrtSZjs52TdKC5Xazvp6b22pKNQSybvNb4mAwwuzXQFLKM7Pq5htpNNg8ZJ9dZJUF8gqc3aFXywYvaFLMXWdNUfErL8GEgUR3sEpNajEXbUcLLh";
const RedirectLink = "https://www.harshitaapptech.com/";

//for live
var connection = mysql.createConnection({
    //properties of mysql connection
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'harsmnhg_todos'
});

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
app.listen(5000, () => {
    console.log("started");
});

//listen for '/'
app.get('/todo/api/', (_, resp) => {
    console.log('inside / nothing to see here , redirecting to ', RedirectLink);
    //mysql
    //to redirect user to a specific page
    resp.redirect(RedirectLink);
});

//login user
app.post('/todo/api/login/', verifyHeader, function (req, res) {

    console.log('login called ');

    if (req.key === HeaderKey) {

        console.log('header validated ');

        var data = req.body;
        var email = data.email;
        var photo = data.photo;
        var name = data.name;

        if (typeof email === 'undefined') {

            console.log('email and uid not valid');

            res.sendStatus(422);

        } else {

            const user = {
                email: email,
                name: name,
                photo: photo
            }

            console.log('user ', user);

            jwt.sign({ user: user }, SecretKey, (err, token) => {
                if (!!err) {
                    console.log('error creating token ', err);

                    const obj = {
                        message: 'Login failed',
                        error: 'true',
                        token: null
                    };
                    res.status(400).json(obj);
                } else {
                    console.log('token created');

                    connection.query("INSERT INTO `users`(`name`, `email`, `profile_url`) VALUES (?,?,?)", [name, email, photo], function (error, rows) {
                        if (!!error) {
                            console.log('error ', error);
                            obj = {
                                error: true,
                                message: "error " + error,
                                todo: null
                            }
                            resp.status(400).send(obj);
                        } else {
                            console.log('user created');
                            const obj = {
                                message: 'Login success',
                                error: false,
                                token: token
                            };
                            res.status(200).json(obj);
                        }
                    });
                }
            });
        }

    } else {

        console.log('header is not valid in login ');

        res.sendStatus(400);
    }
});

//delete user
app.get('/todo/api/remove-user/', verifyToken, function (req, res) {

    jwt.verify(req.token, SecretKey, (err, authData) => {
        if (!!err) {
            res.sendStatus(401);
        } else {
            //user is verified
            var userID = authData.email;

            connection.query("DELETE FROM users WHERE user_id = ?", [userID], function (error, rows) {
                if (!!error) {
                    console.log('error ', error);
                    obj = {
                        error: true,
                        message: "error " + error
                    }
                    resp.status(400).send(obj);
                } else {
                    connection.query("DELETE FROM todos WHERE user_id = ?", [userID], function (error, rows) {
                        if (!!error) {
                            console.log('error ', error);
                            obj = {
                                error: true,
                                message: "error " + error
                            }
                            resp.status(400).send(obj);
                        } else {
                            console.log('completed');
                            obj = {
                                error: false,
                                message: "Completed"
                            }
                            resp.status(200).send(obj);
                        }
                    });
                }
            });
        }
    });
});

//create todo
app.post('/todo/api/create-todo', verifyToken, function (req, resp) {

    jwt.verify(req.token, SecretKey, (err, authData) => {
        if (!!err) {
            res.sendStatus(401);
        } else {
            //user is verified
            var email = authData.email;
            var text = req.body.text;

            connection.query("INSERT INTO `todos`(`text`) VALUES (?)", [text], function (error, rows) {
                if (!!error) {
                    console.log('error ', error);
                    obj = {
                        error: true,
                        message: "error " + error,
                        todo: null
                    }
                    resp.status(400).send(obj);
                } else {
                    console.log('count ');
                    obj = {
                        error: false,
                        message: "Todo added"
                    }
                    resp.status(200).send(obj);
                }
            });
        }
    });
});

//complete todo
app.get('/todo/api/complete/:todoID', verifyToken, function (req, resp) {

    jwt.verify(req.token, SecretKey, (err, authData) => {
        if (!!err) {
            res.sendStatus(401);
        } else {
            //user is verified
            var todoID = req.params.todoID;

            connection.query("UPDATE `todos` SET `completed`= ABS(`completed` - 1) WHERE `todo_id` = ?", [todoID], function (error, rows) {
                if (!!error) {
                    console.log('error ', error);
                    obj = {
                        error: true,
                        message: "error " + error
                    }
                    resp.status(400).send(obj);
                } else {
                    console.log('completed');
                    obj = {
                        error: false,
                        message: "Completed"
                    }
                    resp.status(200).send(obj);
                }
            });
        }
    });
});

//remove todo
app.get('/todo/api/remove/:todoID', verifyToken, function (req, resp) {

    jwt.verify(req.token, SecretKey, (err, authData) => {
        if (!!err) {
            res.sendStatus(401);
        } else {
            //user is verified
            var todoID = req.params.todoID;

            connection.query("UPDATE `todos` SET `removed`= ABS(`removed` - 1) WHERE `todo_id` = ?", [todoID], function (error, rows) {
                if (!!error) {
                    console.log('error ', error);
                    obj = {
                        error: true,
                        message: "error " + error
                    }
                    resp.status(400).send(obj);
                } else {
                    console.log('Removed ');
                    obj = {
                        error: false,
                        message: "todo removed"
                    }
                    resp.status(200).send(obj);
                }
            });
        }
    });
});

//get all todos of a user
app.get('/todo/api/get-todo', verifyToken, function (req, resp) {

    jwt.verify(req.token, SecretKey, (err, authData) => {
        if (!!err) {
            res.sendStatus(401);
        } else {
            //user is verified
            var userID = authData.id;
            var limit = 10;

            connection.query("SELECT * FROM todos WHERE user_id = ? limit = ? AND removed != 1", [userID, limit], function (error, rows) {
                if (!!error) {
                    console.log('error ', error);
                    obj = {
                        error: true,
                        message: "error " + error,
                        todo: null
                    }
                    resp.status(400).send(obj);
                } else {
                    console.log('count ');
                    obj = {
                        error: false,
                        message: "You have some data",
                        todo: rows
                    }
                    resp.status(200).send(obj);
                }
            });
        }
    });
});

// -------------------------- Functions ------------nodemon---------------------------------- //

//Format of token
// Authorization: Bearer <access_token>
//Verify token function

function verifyToken(req, res, next) {
    //get auth header value
    const bearerHeader = req.headers['authorization'];
    // check if not is undefined

    if (typeof bearerHeader !== 'undefined') {
        //spilit at the space
        const bearer = bearerHeader.split(' ');
        //get token from array
        const bearerToken = bearer[1];
        //set the token
        req.token = bearerToken;
        //next middleware
        next();
    } else {
        // forbidden
        res.sendStatus(403);
    }
}

//Format of token
// key: key
//Verify token function

function verifyHeader(req, res, next) {
    //get auth header value
    const keyHeader = req.headers['key'];
    // check if not is undefined

    console.log('this is header key ', keyHeader);

    if (typeof keyHeader !== 'undefined') {
        req.key = keyHeader;
        //next middleware
        next();
    } else {
        // forbidden
        res.sendStatus(403);
    }
}
